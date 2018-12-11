using FFive.Data.Models;
using FFive.Data.Repositories;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/projecttechstacks")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class ProjectTechstacksController : Controller
    {
        private readonly IGenericService<ProjectTechstack, string> _genericService;

        public ProjectTechstacksController(IGenericService<ProjectTechstack, string> genericService)
        {
            _genericService = genericService;
        }

        /// <summary>
        /// Fetch all Project Techstacks
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<PagedList<ProjectTechstack>> Get()
        {
            var items = _genericService.GetAllAsync();

            if (items != null)
                return items;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Project Techstack
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTechstack>> Get(Guid id)
        {
            var item = await _genericService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new Project Techstack
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ProjectTechstack>> Post(ProjectTechstack entity)
        {
            try
            {
                var itemCount = await _genericService.CreateAsync(entity);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Project Techstack
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectTechstack>> Put(Guid id, [FromBody]ProjectTechstack entity)
        {
            try
            {
                var itemCount = await _genericService.UpdateAsync(id, entity);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a Project Techstack
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(Guid id)
        {
            var result = await _genericService.DeleteAsync(id);
            if (result > 0)
                return Ok();
            else
                return NotFound();
        }
    }
}