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
    [Route("api/v{v:apiVersion}/platforms")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class PlatformsController : Controller
    {
        private readonly IGenericService<Platform, string> _genericService;
        private readonly IMapper _mapper;

        public PlatformsController(IGenericService<Platform, string> genericService, IMapper mapper)
        {
            _genericService = genericService;
            _mapper = mapper;
        }

        /// <summary>
        /// Fetch all Platforms
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<PagedList<Platform>> Get(int pageNumber = 1)
        {
            var items = _genericService.GetAllAsync(new PagingParams { PageNumber = pageNumber, PageSize = 5 });

            if (items != null)
                return items;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Platform
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<Platform>> Get(Guid id)
        {
            var item = await _genericService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new Platform
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Platform>> Post(SimpleCreate entity)
        {
            try
            {
                var platform = _mapper.Map<Platform>(entity);
                var itemCount = await _genericService.CreateAsync(platform);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = platform.Id }, platform);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Platform
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Platform>> Put(Guid id, [FromBody]Platform entity)
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
        /// Deletes a Platform
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