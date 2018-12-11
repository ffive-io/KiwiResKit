using AutoMapper;
using FFive.Data.Models;
using FFive.Data.ViewModels;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/projectlocationbillingroles")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class ProjectLocationBillingRolesController : Controller
    {
        private readonly IGenericService<ProjectLocationBillingRole, string> _genericService;
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public ProjectLocationBillingRolesController(IGenericService<ProjectLocationBillingRole, string> genericService, IMapper mapper, IProjectService projectService)
        {
            _genericService = genericService;
            _mapper = mapper;
            _projectService = projectService;
        }

        /// <summary>
        /// Fetch all Project Location Billing Role
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<ProjectLocationBillingRole>>> Get()
        {
            var items = await _genericService.GetAllWithoutPaginationAsync();
            if (items != null)
                return items;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Project Location Billing Role
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectLocationBillingRole>> Get(Guid id)
        {
            var item = await _genericService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new ProjectLocationBillingRole
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<List<ProjectLocationBillingRole>>> Post([FromBody] List<ProjectLocationBillingRoleCreate> entity)
        {
            try
            {
                var projectId = entity.Select(a => a.ProjectId).FirstOrDefault();

                if (projectId != null)
                {
                    var existingItems = await _projectService.GetAllBillingRolesByProjectId(projectId);

                    //Remove all existing
                    foreach (var item in existingItems)
                    {
                        await _genericService.DeleteAsync(item.Id);
                    }
                    //Add new items
                    foreach (var item in entity)
                    {
                        var plbr = _mapper.Map<ProjectLocationBillingRole>(item);
                        var itemCount = await _genericService.CreateAsync(plbr);
                    }

                    var newItems = await _genericService.GetAllWithoutPaginationAsync();

                    if (newItems != null)
                    {
                        return newItems;
                        //return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity);
                    }
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Project Location Billing Role
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectLocationBillingRole>> Put(Guid id, [FromBody]ProjectLocationBillingRole entity)
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
        /// Deletes a Project Location Billing Role
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