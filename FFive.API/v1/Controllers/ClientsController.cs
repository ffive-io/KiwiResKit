using AutoMapper;
using FFive.Data.Models;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using FFive.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FFive.API.v1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{v:apiVersion}/clients")]
    [ApiController]
    public class ClientsController : Controller
    {
        private readonly IClientService _clientService;
        private readonly IGenericService<ClientContact, string> _genericClientContactService;
        private readonly IMapper _mapper;

        public ClientsController(IClientService clientService, IGenericService<ClientContact, string> genericClientContactService, IMapper mapper)
        {
            _clientService = clientService;
            _genericClientContactService = genericClientContactService;
            _mapper = mapper;
        }

        #region Clients

        /// <summary>
        /// Fetch all Clients
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        public ActionResult<PagedList<ClientDto>> Get([FromQuery]int page = 1, string name = null)
        {
            Expression<Func<Client, bool>> where = null;
            if (name != null)
                where = (c) => c.Name.Contains(name);

            Expression<Func<Client, string>> orderBy = (c) => c.Id.ToString();

            var clientPage = _clientService.GetAllAsync(new PagingParams { PageNumber = page }, where, orderBy);

            if (clientPage == null)
            {
                return NotFound();
            }

            var clients = clientPage.Data.Select(p => new ClientDto
            {
                ClientId = p.Id,
                Name = p.Name,
                Location = p.Location.Name,
                City = p.City,
                State = p.State,
                StreetAddress = p.StreetAddress,
                ClientType = p.ClientType.Name,
                SalesContact = p.SalesContact.FirstName + ' ' + p.SalesContact.LastName,
                CreatedDate = p.CreatedAt,
                ZipCode = p.ZipCode,
                Status = p.Status,
                CCName = p.ClientContacts.Select(d => d.FirstName + ' ' + d.LastName).FirstOrDefault(),
                CCEmail = p.ClientContacts.Select(d => d.Email).FirstOrDefault(),
                CCContactNumber = p.ClientContacts.Select(d => d.ContactNumber).FirstOrDefault(),
                CCTimeZone = p.ClientContacts.Select(d => d.TimeZone).FirstOrDefault(),
            }).ToList();

            PagedList<ClientDto> clientDto = new PagedList<ClientDto>(clients, clientPage.TotalItems, clientPage.PageNumber, clientPage.PageSize);

            if (clientDto != null)
                return clientDto;

            return NotFound();
        }

        /// <summary>
        /// Fetch a new Client
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales, user")]
        public async Task<ActionResult<Client>> Get(Guid id)
        {
            var item = await _clientService.GetByIdAsync(id);
            if (item != null)
                return item;

            return NotFound();
        }

        /// <summary>
        /// Creates a new Client
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales")]
        public async Task<ActionResult<Client>> Post(ClientCreate entity)
        {
            try
            {
                var client = _mapper.Map<Client>(entity);
                var itemCount = await _clientService.CreateAsync(client);

                if (entity.ClientContacts != null && entity.ClientContacts.Count > 0)
                {
                    var clientContacts = _mapper.Map<List<ClientContact>>(entity.ClientContacts);

                    foreach (var item in clientContacts)
                    {
                        item.ClientId = client.Id;
                        await _genericClientContactService.CreateAsync(item);
                    }
                }

                if (itemCount > 0)
                {
                    var item = await _clientService.GetByIdAsync(client.Id);
                    return CreatedAtAction(nameof(Get), new { id = client.Id }, item);
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Client
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales")]
        public async Task<ActionResult<Client>> Put(Guid id, [FromBody]ClientUpdate entity)
        {
            try
            {
                var client = _mapper.Map<Client>(entity);
                var itemCount = await _clientService.UpdateAsync(id, client);
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
        /// Deletes a Client
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, cxo, opshead, projecthead, presales")]
        public async Task<ActionResult> DeleteAsync(Guid id)
        {
            var result = await _clientService.DeleteAsync(id);
            if (result > 0)
                return Ok();
            else
                return NotFound();
        }

        #endregion Clients
    }
}