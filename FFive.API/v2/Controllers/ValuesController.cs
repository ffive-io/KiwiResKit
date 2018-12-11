using FFive.Data.Models;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FFive.API.v2.Controllers
{
    [ApiVersion("2.0")]
    [Route("api/v{v:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        private readonly IResourceService _resourceService;

        public ValuesController(IResourceService resourceService)
        {
            _resourceService = resourceService;
        }

        // GET api/values
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<string>> Get()
        {
            var x = await _resourceService.GetByIdAsync(Guid.Parse("08d62549-37b0-babc-b2c2-515da53cde3b"));

            return new string[] { "value1", x.Designation };
        }

        /// <summary>
        /// Fetch a specific value.
        /// </summary>
        /// <param name="id"></param>
        [HttpGet("{id}")]
        [Authorize(Policy = "User")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        [Authorize(Policy = "Atleast18Years")]
        public ActionResult<string> Post(TestModel testModel)
        {
            if (testModel != null)
            {
                return testModel.Name;
            }
            return "value";
        }
    }
}