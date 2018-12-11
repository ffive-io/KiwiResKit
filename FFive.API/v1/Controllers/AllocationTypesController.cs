using FFive.Data.Models;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/allocationtypes")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class AllocationTypesController : Controller
    {
        private readonly IGenericService<AllocationType, string> _genericService;

        public AllocationTypesController(IGenericService<AllocationType, string> genericService)
        {
            _genericService = genericService;
        }

        /// <summary>
        /// Fetch all Allocation Types
        /// </summary>
        /// <remarks>This API will fetch all the values.</remarks>
        /// <returns>List of allocation types</returns>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<AllocationType>>> Get()
        {
            var items = await _genericService.GetAllWithoutPaginationAsync();

            if (items != null)
                return items;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Allocation Type
        /// </summary>
        /// <param name="id">Allocation Type Identifier</param>
        /// <returns>An Allocation Type</returns>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<AllocationType>> Get(Guid id)
        {
            var item = await _genericService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new Allocation Type
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<AllocationType>> Post(AllocationType entity)
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
        /// Updates a Allocation Type
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<AllocationType>> Put(Guid id, [FromBody]AllocationType entity)
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
        /// Deletes a Allocation Type
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