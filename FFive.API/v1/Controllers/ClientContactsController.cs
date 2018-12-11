using AutoMapper;
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
    [Route("api/v{v:apiVersion}/clientcontacts")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class ClientContactsController : Controller
    {
        private readonly IGenericService<ClientContact, string> _genericService;
        private readonly IMapper _mapper;

        public ClientContactsController(IGenericService<ClientContact, string> genericService, IMapper mapper)
        {
            _genericService = genericService;
            _mapper = mapper;
        }

        /// <summary>
        /// Fetch all Client Contacts
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<PagedList<ClientContact>> Get()
        {
            var items = _genericService.GetAllAsync();

            if (items != null)
                return items;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Client Contact
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientContact>> Get(Guid id)
        {
            var item = await _genericService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new Client Contact
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ClientContact>> Post(ClientContactCreate entity)
        {
            try
            {
                var client = _mapper.Map<ClientContact>(entity);
                var itemCount = await _genericService.CreateAsync(client);
                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = client.Id }, client);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Client Contact
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<ClientContact>> Put(Guid id, [FromBody]ClientContactCreate entity)
        {
            try
            {
                var client = _mapper.Map<ClientContact>(entity);
                var itemCount = await _genericService.UpdateAsync(id, client);
                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = client.Id }, client);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a Client Contact
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