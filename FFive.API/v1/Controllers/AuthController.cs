using FFive.Data.ViewModels;
using FFive.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Authenticate the user and returns Auth Token
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [HttpPost]
        [Route("token")]
        public async Task<ActionResult<TokenResponse>> Token([FromBody]TokenRequest tokenRequest)
        {
            try
            {
                return await _authService.GetToken(tokenRequest);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Authenticate the user and returns Auth Token
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [HttpPost]
        [Route("google")]
        public async Task<ActionResult<TokenResponse>> Google([FromBody]SocialLoginRequest loginRequest)
        {
            try
            {
                var result = await new HttpClient().GetStringAsync($"https://www.googleapis.com/plus/v1/people/{loginRequest.SocialUserId}?access_token={loginRequest.AccessToken}");

                if (result == null)
                {
                    return Unauthorized();
                }

                var jsonResult = JObject.Parse(result);
                var email = ((JArray)jsonResult["emails"]).FirstOrDefault()["value"].ToString(); ;

                return await _authService.GetTokenForSocial("google", email);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Refresh the Auth Token and returns
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [HttpPost]
        [Route("refresh")]
        public async Task<ActionResult<TokenResponse>> RefreshToken([FromBody]string refreshToken)
        {
            try
            {
                return await _authService.GetToken(refreshToken);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        /// <summary>
        /// Get All Rolenames
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [HttpGet]
        [Route("roles")]
        public async Task<ActionResult<List<SimpleObject>>> Roles()
        {
            try
            {
                return await _authService.GetAllRoles();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}