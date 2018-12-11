using FFive.Data;
using FFive.Data.Models.Auth;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FFive.Services.Impl
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenRepository _tokenRepository;
        private readonly ILogger<AuthService> _logger;
        private readonly IOptions<TokenProviderConfig> _options;

        public AuthService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, ITokenRepository tokenRepository, ILogger<AuthService> logger, IOptions<TokenProviderConfig> options, RoleManager<IdentityRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenRepository = tokenRepository;
            _logger = logger;
            _options = options;
            _roleManager = roleManager;
        }

        public async Task<TokenResponse> GetToken(TokenRequest tokenRequest)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(tokenRequest.UserName, tokenRequest.Password, false, lockoutOnFailure: false);
                if (!result.Succeeded)
                {
                    throw new Exception("Invalid username or password.");
                }
                var user = await _userManager.Users.SingleAsync(i => i.UserName == tokenRequest.UserName);
                if (!user.IsEnabled)
                {
                    throw new Exception("Invalid username or password.");
                }
                var response = await GetToken(user);

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public async Task<TokenResponse> GetTokenForSocial(string provider, string email)
        {
            try
            {
                switch (provider)
                {
                    case "google":

                        var user = await _userManager.FindByEmailAsync(email);

                        if (user == null || !user.IsEnabled)
                        {
                            throw new Exception("Invalid username or password.");
                        }
                        var response = await GetToken(user);

                        return response;

                    default:
                        throw new Exception("Invalid login provider");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        public async Task<TokenResponse> GetToken(string refreshToken)
        {
            try
            {
                var refreshTokenModel = await _tokenRepository.GetByTokenAsync(refreshToken);

                if (refreshTokenModel == null)
                {
                    throw new Exception("User must relogin.");
                }

                if (!await _signInManager.CanSignInAsync(refreshTokenModel.User))
                {
                    throw new Exception("User is unable to login.");
                }

                if (_userManager.SupportsUserLockout && await _userManager.IsLockedOutAsync(refreshTokenModel.User))
                {
                    throw new Exception("User is locked out.");
                }

                var user = refreshTokenModel.User;
                var token = await GetToken(user, refreshTokenModel);
                return token;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
        }

        private async Task<TokenResponse> GetToken(ApplicationUser user, RefreshToken refreshToken = null)
        {
            var options = GetOptions();
            var now = DateTime.UtcNow;

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            };

            var userClaims = await _userManager.GetClaimsAsync(user);
            foreach (var userClaim in userClaims)
            {
                claims.Add(new Claim(userClaim.Type, userClaim.Value));
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(Extensions.RoleClaimType, userRole));
            }

            if (refreshToken == null)
            {
                refreshToken = new RefreshToken()
                {
                    UserId = user.Id,
                    Token = Guid.NewGuid().ToString("N"),
                    IssuedUtc = now,
                    ExpiresUtc = now.Add(options.Expiration)
                };

                var existingToken = await _tokenRepository.GetByUserIdAsync(user.Id);
                if (existingToken != null)
                {
                    await _tokenRepository.DeleteAsync(existingToken.Id);
                }
                await _tokenRepository.CreateAsync(refreshToken);
            }
            else
            {
                refreshToken.IssuedUtc = now;
                refreshToken.ExpiresUtc = now.Add(options.Expiration);
                await _tokenRepository.UpdateAsync(refreshToken.Id, refreshToken);
            }
            var jwt = new JwtSecurityToken(
                issuer: options.Issuer,
                audience: options.Audience,
                claims: claims.ToArray(),
                notBefore: now,
                expires: now.Add(options.Expiration),
                signingCredentials: options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new TokenResponse
            {
                AccessToken = encodedJwt,
                RefreshToken = refreshToken.Token,
                ExpiresIn = (int)options.Expiration.TotalSeconds,
                Username = user.UserName,
            };
            return response;
        }

        private TokenProviderOptions GetOptions()
        {
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_options.Value.SecretKey));

            return new TokenProviderOptions
            {
                Audience = _options.Value.Audience,
                Issuer = _options.Value.Issuer,
                Expiration = TimeSpan.FromMinutes(Convert.ToInt32(_options.Value.ExpirationMinutes)),
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            };
        }

        public async Task<List<SimpleObject>> GetAllRoles()
        {
            return await _roleManager.Roles.Select(a => new SimpleObject
            {
                Id = Guid.Parse(a.Id),
                Name = a.Name
            }).ToListAsync();
        }
    }
}