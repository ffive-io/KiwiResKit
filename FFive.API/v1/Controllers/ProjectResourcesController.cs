﻿using AutoMapper;
using FFive.Data.Models;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/projectresources")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class ProjectResourcesController : Controller
    {
        private readonly IGenericService<ProjectResource, string> _genericService;
        private readonly IMapper _mapper;

        public ProjectResourcesController(IGenericService<ProjectResource, string> genericService, IMapper mapper)
        {
            _genericService = genericService;
            _mapper = mapper;
        }

        /// <summary>
        /// Fetch all Project Resources
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<PagedList<ProjectResource>> Get()
        {
            var items = _genericService.GetAllAsync();

            if (items != null)
                return items;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Project Resource
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResource>> Get(Guid id)
        {
            var item = await _genericService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new Project Resource
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ProjectResource>> Post(ProjectResourceCreate entity)
        {
            try
            {
                var projectResource = _mapper.Map<ProjectResource>(entity);
                var itemCount = await _genericService.CreateAsync(projectResource);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = projectResource.Id }, projectResource);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Project Resource
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectResource>> Put(Guid id, [FromBody]ProjectResourceCreate entity)
        {
            try
            {
                var projectResource = _mapper.Map<ProjectResource>(entity);
                var itemCount = await _genericService.UpdateAsync(id, projectResource);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = projectResource.Id }, projectResource);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a Project Resource
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