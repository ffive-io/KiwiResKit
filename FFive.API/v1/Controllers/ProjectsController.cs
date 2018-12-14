using AutoMapper;
using FFive.Data;
using FFive.Data.Models;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using FFive.Services;
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
    [Route("api/v{v:apiVersion}/projects")]
    //[Authorize(Roles = "admin")]
    [ApiController]
    public class ProjectsController : Controller
    {
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public ProjectsController(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        /// <summary>
        /// Fetch all Projects
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public ActionResult<PagedList<ProjectDto>> Get([FromQuery]int page = 1, string name = null)
        {
            Expression<Func<Project, bool>> where = null;
            if (name != null)
                where = (c) => c.Name.Contains(name);

            Expression<Func<Project, string>> orderBy = (c) => c.Id.ToString();

            var items = _projectService.GetAllAsync(new PagingParams { PageNumber = page }, where, orderBy);

            if (items == null)
                return NotFound();

            var projects = items.Data.Select(a => new ProjectDto
            {
                ProjectId = a.Id,
                ProjectName = a.Name,
                ClientId = a.ClientId,
                ClientName = a.Client.Name,
                ProjectTypeId = a.ProjectTypeId,
                ProjectType = a.ProjectType.Name,
                PlatformId = a.PlatformId,
                Platform = a.Platform.Name,
                StartDate = a.ActualStartDate,
                EndDate = a.EndDate,
                OperationHeadId = a.OperationHeadId,
                OperationHead = a.OperationHead == null ? null : (a.OperationHead.FirstName + ' ' + a.OperationHead.LastName),
                ProjectHeadId = a.ProjectHeadId,
                ProjectHead = a.ProjectHead == null ? null : (a.ProjectHead.FirstName + ' ' + a.ProjectHead.LastName),
                ProjectStatus = a.Status.ToString(),
                NoOfResource = a.ProjectResources.Count()
            }).ToList();
            PagedList<ProjectDto> projectDto = new PagedList<ProjectDto>(projects, items.TotalItems, items.PageNumber, items.PageSize);

            if (projectDto != null)
                return projectDto;

            return NotFound();
        }

        /// <summary>
        /// Fetch all Projects
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("allprojects")]
        public async Task<ActionResult<List<SimpleObject>>> GetAllProjects()
        {
            var items = await _projectService.GetAllProjects();
            if (items != null)
                return items;
            return NotFound();
        }

        /// <summary>
        /// Fetch all Projects
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [Route("{projectId}/billingroles")]
        public async Task<ActionResult<List<SimpleObject>>> GetAllProjectLocationBillingRoles(Guid projectId)
        {
            var items = await _projectService.GetAllBillingRolesByProjectId(projectId);
            if (items != null)
                return items;
            return NotFound();
        }

        /// <summary>
        /// Fetch Project Details
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> Get(Guid id, DateTime? startDate, DateTime? endDate)
        {
            DateTime date = DateTime.UtcNow.ConvertToIST();
            DateTime firstDayOfMonth = DateTime.UtcNow.ConvertToIST(), lastDayOfMonth = DateTime.UtcNow.ConvertToIST();
            if (startDate == null || endDate == null)
            {
                firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
                lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            }
            else
            {
                firstDayOfMonth = (startDate ?? DateTime.UtcNow).ConvertToIST();
                lastDayOfMonth = (endDate ?? DateTime.UtcNow).ConvertToIST();
            }

            var item = await _projectService.GetByIdAsync(id);
            if (item == null)
                return NotFound();
            try
            {
                var result = new ProjectDto
                {
                    ProjectId = item.Id,
                    ProjectName = item.Name,
                    ClientName = item.Client.Name,
                    ProjectType = item.ProjectType.Name,
                    Platform = item.Platform.Name,
                    StartDate = item.ActualStartDate,
                    EndDate = item.ActualEndDate,
                    ProjectStatus = item.Status.ToString(),
                    OperationHead = item.OperationHead == null ? null : item.OperationHead.FirstName + ' ' + item.OperationHead.LastName,
                    ProjectHead = item.ProjectHead == null ? null : item.ProjectHead.FirstName + ' ' + item.ProjectHead.LastName,
                    ProjectResources = item.ProjectResources?.Select(a => new ProjectResourceDto
                    {
                        ProjectResourceId = a.Id,
                        resourceId = a.ResourceId,
                        ProjectRole = a.ProjectLocationBillingRole.LocationBillingRole.BillingRole,
                        BillingType = a.AllocationType.Name,
                        ResourceName = a.Resource.FirstName + ' ' + a.Resource.LastName,
                        Designation = a.Resource.Designation,
                        AllocationPercentage = a.AllocationPercent,
                        AllocationStartDate = a.AllocationStartDate,
                        AllocationEndDate = a.AllocationEndDate,
                        ReportingManager = a.Resource.Manager == null ? null : a.Resource.Manager.FirstName + ' ' + a.Resource.Manager.LastName,
                        ResourceOwner = a.Resource.ResourceOwner == null ? null : a.Resource.ResourceOwner.FirstName + ' ' + a.Resource.ResourceOwner.LastName,
                    }).Where(a => firstDayOfMonth < a.AllocationEndDate && lastDayOfMonth > a.AllocationStartDate).ToList(),
                    ProjectLocationBillingRoles = item.ProjectLocationBillingRoles?.Select(a => new ProjectLocationBillingRoleCreate
                    {
                        LocationBillingRoleId = a.LocationBillingRoleId,
                        ProjectId = a.ProjectId,
                        RatePerHour = a.RatePerHour,
                        RatePerMonth = a.RatePerMonth
                    }).ToList()
                };
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Creates a new Project
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Project>> Post(ProjectCreate entity)
        {
            try
            {
                var project = _mapper.Map<Project>(entity);
                var itemCount = await _projectService.CreateAsync(project);

                if (itemCount > 0)
                {
                    return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a Project
        /// </summary>
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Project>> Put(Guid id, [FromBody]Project entity)
        {
            try
            {
                var itemCount = await _projectService.UpdateAsync(id, entity);

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
        /// Deletes a Project
        /// </summary>
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(Guid id)
        {
            var result = await _projectService.DeleteAsync(id);
            if (result > 0)
                return Ok();
            else
                return NotFound();
        }
    }
}