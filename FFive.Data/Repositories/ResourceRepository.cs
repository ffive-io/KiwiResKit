using FFive.Data.Models;
using FFive.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class ResourceRepository : GenericRepository<Resource, string>, IResourceRepository
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMemoryCache _cache;

        public ResourceRepository(AppDbContext appDbContext, IMemoryCache cache) : base(appDbContext)
        {
            _appDbContext = appDbContext;
            _cache = cache;
        }

        public PagedList<Resource> GetAllByRoleNameAsync(string roleName, PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var resources = _appDbContext.Resources.AsQueryable();
            var role = _appDbContext.Roles.Where(a => a.Name.ToLower() == roleName.ToLower()).FirstOrDefault();
            IQueryable<string> userids = _appDbContext.UserRoles.Where(a => a.RoleId == role.Id).Select(a => a.UserId);

            var query = (from users in _appDbContext.Users
                         join resour in _appDbContext.Resources on users.ResourceId equals resour.Id
                         where userids.Contains(users.Id.ToString())
                         select resour).AsQueryable();

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<Resource>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public new PagedList<Resource> GetAllAsync(PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var query = _appDbContext.Resources
                .Include(a => a.Manager)
                .Include(a => a.ResourceOwner)
                .Include(a => a.Skillset)
                .Include(a => a.ProjectResources)
                    .ThenInclude(a => a.AllocationType)
                .Include(a => a.ProjectResources)
                    .ThenInclude(a => a.Project)
                .AsQueryable();

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<Resource>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public PagedList<Resource> GetAllCachedAsync(PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null)
        {
            PagedList<Resource> resources;

            if (!_cache.TryGetValue("_RESOURCES", out resources))
            {
                // Key not in cache, so get data.
                resources = GetAllAsync(pagingParams, whereExpression, orderByExpression);

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(300));

                // Save data in cache.
                _cache.Set("_RESOURCES", resources, cacheEntryOptions);
            }

            return resources;
        }

        public async Task<List<SimpleObject>> GetAllManagers()
        {
            var managerIds = _appDbContext.Resources.Where(a => a.ManagerId != null).Select(a => a.ManagerId).Distinct();
            var managersInDb = _appDbContext.Resources.Where(a => managerIds.Contains(a.Id));
            var result = await managersInDb.Select(a => new SimpleObject
            {
                Id = a.Id,
                Name = a.FirstName + ' ' + a.LastName + '-' + a.EmpCode
            }).ToListAsync();
            return result;
        }

        public async Task<List<SimpleObject>> GetAllResourceOwners()
        {
            var users = _appDbContext.Users.Include(a => a.ResourceUser).Where(a => a.IsResourceOwner == true);
            var resourceOwners = await users.Select(a => new SimpleObject
            {
                Id = a.ResourceUser.Id,
                Name = a.ResourceUser.FirstName + ' ' + a.ResourceUser.LastName + '-' + a.ResourceUser.EmpCode
            }).ToListAsync();
            return resourceOwners;
        }

        public async Task<List<SimpleObject>> GetAllUsers()
        {
            var users = await _appDbContext.Resources.Select(a => new SimpleObject
            {
                Id = a.Id,
                Name = a.FirstName + ' ' + a.LastName + '-' + a.EmpCode
            }).ToListAsync();
            return users;
        }

        public PagedList<ResourceDto> GetMyResources(Guid? managerId, PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null)
        {
            var resources = _appDbContext.Resources.AsQueryable();

            if (pagingParams == null)
                pagingParams = new PagingParams();

            var spResult = _appDbContext.ResourceSpResult.FromSql($"CALL getresourceallocations({managerId}, 1, '2018-11-01','2018-12-31', null,null,null,{pagingParams.PageNumber})").ToList();

            var query = _appDbContext.Resources
                .Include(a => a.Manager)
                .Include(a => a.ResourceOwner)
                .Include(a => a.Skillset)
                .Include(a => a.ProjectResources)
                    .ThenInclude(a => a.AllocationType)
                .Include(a => a.ProjectResources)
                    .ThenInclude(a => a.Project)
                    .AsQueryable();

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            var result = (from t in spResult
                          join p in query on t.ResourceId equals p.Id
                          select new ResourceDto
                          {
                              ResourceId = p.Id,
                              EmpCode = p.EmpCode,
                              Name = p.FirstName + ' ' + p.LastName,
                              Designation = p.Designation,
                              Skill = p.Skillset.Name,
                              ReportingManagerId = p.Manager == null ? null : p.ManagerId,
                              ReportingManager = p.Manager == null ? null : (p.Manager.FirstName + ' ' + p.Manager.LastName),
                              ResourceOwner = p.ResourceOwner == null ? null : (p.ResourceOwner.FirstName + ' ' + p.ResourceOwner.LastName),
                              ResourceOwnerId = null,
                              AvailableFullDays = t.Available100Days,
                              TotalAllocationPerc = Convert.ToInt32(t.TotalAllocationPerc),
                              TotalDays = t.TotalDays,
                              AllocatedProjects = p.ProjectResources.Select(q => new AllocatedProject
                              {
                                  ProjectResourceId = q.Id,
                                  ProjectName = q.Project.Name,
                                  ProjectId = q.ProjectId,
                                  AllocationType = q.AllocationType.Name,
                                  AllocationPercentage = q.AllocationPercent,
                                  EndDate = q.AllocationEndDate,
                                  StartDate = q.AllocationStartDate,
                                  AllocationTypeId = q.AllocationTypeId,
                                  ProjectLocationBillingRoleId = q.ProjectLocationBillingRoleId
                              }).ToList()
                          }).ToList();

            PagedList<ResourceDto> resourceDto = new PagedList<ResourceDto>(result, 0, pagingParams.PageNumber, 10);
            return resourceDto;
        }

        private IEnumerable<Guid> GetSubordinates(IEnumerable<Resource> resources, Guid resourceId)
        {
            return from res in resources
                   where res.ManagerId == resourceId
                   select res.Id;
        }
    }
}