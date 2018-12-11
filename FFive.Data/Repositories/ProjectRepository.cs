using FFive.Data.Models;
using FFive.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class ProjectRepository : GenericRepository<Project, string>, IProjectRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProjectRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public new PagedList<Project> GetAllAsync(PagingParams pagingParams = null, Expression<Func<Project, bool>> whereExpression = null, Expression<Func<Project, string>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var query = _appDbContext.Projects
                .Include(a => a.ProjectType)
                .Include(a => a.Platform)
                .Include(a => a.Client)
                .Include(a => a.Techstack)
                .Include(a => a.ProjectHead)
                .Include(a => a.OperationHead)
                .Include(a => a.ProjectResources)
                .AsQueryable();

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<Project>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public new async Task<Project> GetByIdAsync(Guid id)
        {
            return await _appDbContext.Projects
                .Include(a => a.ProjectHead)
                .Include(a => a.Client)
                .Include(a => a.Platform)
                .Include(a => a.ProjectType)
                .Include(a => a.Techstack)
                .Include(a => a.ProjectLocationBillingRoles)
                .Include(a => a.ProjectResources)
                    .ThenInclude(b => b.Resource)
                        .ThenInclude(c => c.Manager)
                .Include(a => a.ProjectResources)
                    .ThenInclude(b => b.Resource)
                        .ThenInclude(c => c.ResourceOwner)
                .Include(a => a.ProjectResources)
                    .ThenInclude(a => a.AllocationType)
                .Include(a => a.ProjectResources)
                    .ThenInclude(a => a.ProjectLocationBillingRole)
                        .ThenInclude(a => a.LocationBillingRole)
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public PagedList<Project> GetListAsync(PagingParams pagingParams = null, Expression<Func<Project, bool>> whereExpression = null, Expression<Func<Project, string>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var query = _appDbContext.Projects.Include(a => a.ProjectType).Include(a => a.Platform).Include(a => a.Techstack).Include(a => a.ProjectHead).AsQueryable();

            //query = query.Where(a => a.ClientContacts.Any(y => y.IsPointOfContact == true));

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<Project>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public async Task<List<SimpleObject>> GetAllProjects()
        {
            var projects = await _appDbContext.Projects.Select(a => new SimpleObject
            {
                Id = a.Id,
                Name = a.Name
            }).ToListAsync();
            return projects;
        }

        public async Task<List<SimpleObject>> GetAllBillingRolesByProjectId(Guid projectId)
        {
            var billingRoles = await _appDbContext.ProjectLocationBillingRoles
                .Where(a => a.ProjectId == projectId)
                .Select(a => new SimpleObject
                {
                    Id = a.Id,
                    Name = a.LocationBillingRole.Location.Name + '-' + a.LocationBillingRole.BillingRole
                }).ToListAsync();

            return billingRoles;
        }
    }
}