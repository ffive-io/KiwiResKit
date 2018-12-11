using FFive.Data.Models;
using System;
using System.Linq.Expressions;

namespace FFive.Data.Repositories
{
    public interface IProjectRepository : IGenericRepository<Project, string>
    {
        PagedList<Project> GetListAsync(PagingParams pagingParams = null, Expression<Func<Project, bool>> whereExpression = null, Expression<Func<Project, string>> orderByExpression = null);
    }
}