using FFive.Data.Models;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Services
{
    public interface IResourceService : IGenericService<Resource, string>, IGenericCacheService<Resource, string>
    {
        Task<int> CreateWithUserAccountAsync(Resource resource, bool createLogin, string roleId, bool isResourceOwner = false, string password = null);

        Task<int> UpdateUserAccountAsync(Guid resourceId, Resource resource, bool createLogin, string roleId, bool isResourceOwner = false, string password = null);

        Task<int> DeleteUserAsync(Guid resourceId);

        Task<List<SimpleObject>> GetAllManagers();

        Task<List<SimpleObject>> GetAllResourceOwners();

        Task<List<SimpleObject>> GetAllUsers();

        PagedList<Resource> GetMyResources(Guid managerId, PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null);

        PagedList<Resource> GetAllByRoleNameAsync(string roleName, PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null);
    }
}