﻿using AutoMapper;
using FFive.Data.Models;
using FFive.Data.Models.Auth;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/resources")]
    [ApiController]
    public class ResourcesController : Controller
    {
        private readonly IResourceService _resourceService;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public ResourcesController(IResourceService resourceService, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _resourceService = resourceService;
            _mapper = mapper;
            _userManager = userManager;
        }

        /// <summary>
        /// Fetch all resources
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<PagedList<ResourceDto>> Get([FromQuery]DateTime startDate,
            DateTime endDate, AllocType? allocType = AllocType.Any, string name = null, string designation = null, Guid? skillsetId = null, int? page = 1)
        {
            Expression<Func<Resource, bool>> where = null;
            if (name != null)
                where = (c) => c.FirstName.Contains(name) || c.LastName.Contains(name);

            Expression<Func<Resource, string>> orderBy = (c) => c.Id.ToString();

            var resources = _resourceService.GetMyResources(null, allocType ?? AllocType.Any, startDate, endDate, new PagingParams { PageNumber = page ?? 1 }, name, designation, skillsetId);

            if (resources != null)
                return resources;

            return NotFound();
        }

        /// <summary>
        /// Fetch all resources
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("bymanager")]
        public ActionResult<PagedList<ResourceDto>> GetMyResources([FromQuery]DateTime startDate,
            DateTime endDate, AllocType? allocType = AllocType.Any, string name = null, string designation = null, Guid? skillsetId = null, int? page = 1)
        {
            Expression<Func<Resource, bool>> where = null;
            if (name != null)
                where = (c) => c.FirstName.Contains(name) || c.LastName.Contains(name);

            Expression<Func<Resource, string>> orderBy = (c) => c.Id.ToString();

            var user = _userManager.GetUserAsync(HttpContext.User).Result;
            var resources = _resourceService.GetMyResources(user.ResourceId, allocType ?? AllocType.Any, startDate, endDate, new PagingParams { PageNumber = page ?? 1 }, name, designation, skillsetId);

            if (resources != null)
                return resources;

            return NotFound();
        }

        /// <summary>
        /// Fetch all resources by role name
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("byrole/{roleName}")]
        public ActionResult<PagedList<Resource>> GetByRoleName(string roleName)
        {
            var resources = _resourceService.GetAllByRoleNameAsync(roleName);

            if (resources != null)
                return resources;

            return NotFound();
        }

        /// <summary>
        /// Fetch all managers
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("allmanagers")]
        public async Task<ActionResult<List<SimpleObject>>> GetAllManagers()
        {
            var managers = await _resourceService.GetAllManagers();
            if (managers != null)
                return managers;

            return NotFound();
        }

        /// <summary>
        /// Fetch all resource owners
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("allresourceowners")]
        public async Task<ActionResult<List<SimpleObject>>> GetAllResourceOwners()
        {
            var resourceOwners = await _resourceService.GetAllResourceOwners();
            if (resourceOwners != null)
                return resourceOwners;

            return NotFound();
        }

        /// <summary>
        /// Fetch all resources with basic info without pagination
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("allresources")]
        public async Task<ActionResult<List<SimpleObject>>> GetAllResources()
        {
            var resources = await _resourceService.GetAllUsers();
            if (resources != null)
                return resources;

            return NotFound();
        }

        /// <summary>
        /// Fetch a resource
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<Resource>> Get(Guid id)
        {
            var newResource = await _resourceService.GetByIdAsync(id);
            if (newResource != null)
                return newResource;

            return NotFound();
        }

        /// <summary>
        /// Creates a new resource
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead")]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Resource>> Post(ResourceCreate resource)
        {
            try
            {
                var entity = _mapper.Map<Resource>(resource);
                int itemCount = 0;
                itemCount = await _resourceService.CreateWithUserAccountAsync(entity, resource.CreateLogin, resource.RoleId.ToString(), resource.IsResourceOwner ?? false, resource.Password);

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
        /// Updates a resource
        /// </summary>
        [Authorize(Roles = "admin, cxo, opshead, projecthead")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Resource>> Put(Guid id, [FromBody]ResourceCreate resource)
        {
            try
            {
                var entity = _mapper.Map<Resource>(resource);
                int itemCount = 0;
                itemCount = await _resourceService.UpdateUserAccountAsync(id, entity, resource.CreateLogin, resource.RoleId.ToString(), resource.IsResourceOwner ?? false, resource.Password);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = resource.Id }, entity);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a resource
        /// </summary>
        [Authorize(Roles = "admin")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(Guid id)
        {
            var result = await _resourceService.DeleteAsync(id);
            if (result > 0)
                return Ok();
            else
                return NotFound();
        }
    }
}