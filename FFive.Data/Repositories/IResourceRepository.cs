using FFive.Data.Cache;
using FFive.Data.Models;
using FFive.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public interface IResourceRepository : IGenericRepository<Resource, string>, IGenericCacheRepository<Resource, string>
    {
        PagedList<Resource> GetAllByRoleNameAsync(string roleName, PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null);

        Task<List<SimpleObject>> GetAllUsers();

        Task<List<SimpleObject>> GetAllManagers();

        Task<List<SimpleObject>> GetAllResourceOwners();
    }
}