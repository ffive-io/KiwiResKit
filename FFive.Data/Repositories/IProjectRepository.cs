using FFive.Data.Models;
using FFive.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public interface IProjectRepository : IGenericRepository<Project, string>
    {
        PagedList<Project> GetListAsync(PagingParams pagingParams = null, Expression<Func<Project, bool>> whereExpression = null, Expression<Func<Project, string>> orderByExpression = null);

        Task<List<SimpleObject>> GetAllProjects();

        Task<List<SimpleObject>> GetAllBillingRolesByProjectId(Guid projectId);
    }
}