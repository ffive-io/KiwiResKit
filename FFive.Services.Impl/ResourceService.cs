using FFive.Data.Models;
using FFive.Data.Models.Auth;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Services.Impl
{
    public class ResourceService : GenericService<Resource, string>, IResourceService
    {
        private readonly IResourceRepository _resourceRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ResourceService(IResourceRepository resourceRepository,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager) : base(resourceRepository)
        {
            _resourceRepository = resourceRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        private async Task<int> CreateUserAccountAsync(Resource resource, string roleId, bool isResourceOwner = false, string password = null)
        {
            var user = await _userManager.FindByNameAsync(resource.Email);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = resource.Email,
                    Email = resource.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    IsEnabled = true,
                    ResourceUser = resource,
                    IsResourceOwner = isResourceOwner
                };
                var x = await _userManager.CreateAsync(user, password ?? "Admin1234!");

                if (x.Succeeded)
                {
                    var identityRole = await _roleManager.FindByIdAsync(roleId);

                    if (identityRole == null)
                        return 0;

                    if (!await _userManager.IsInRoleAsync(user, identityRole.Name))
                        await _userManager.AddToRoleAsync(user, identityRole.Name);

                    return 1;
                }
            }

            return 0;
        }

        private async Task<int> UpdateUserAccountAsync(Resource resource, bool createLogin, string roleId, bool isResourceOwner = false, string password = null)
        {
            var user = await _userManager.FindByNameAsync(resource.Email);

            if (createLogin)
            {
                if (user != null)
                {
                    user.IsEnabled = true;
                    user.IsResourceOwner = isResourceOwner;

                    var x = await _userManager.UpdateAsync(user);

                    if (x.Succeeded)
                    {
                        var identityRole = await _roleManager.FindByIdAsync(roleId);

                        if (identityRole == null)
                            return 0;
                        var existingRoles = await _userManager.GetRolesAsync(user);

                        foreach (var role in existingRoles)
                        {
                            await _userManager.RemoveFromRoleAsync(user, role);
                        }

                        if (!await _userManager.IsInRoleAsync(user, identityRole.Name))
                            await _userManager.AddToRoleAsync(user, identityRole.Name);

                        return 1;
                    }
                }
                else
                {
                    return await CreateUserAccountAsync(resource, roleId, isResourceOwner, password);
                }
            }
            else
            {
                if (user != null)
                {
                    user.IsEnabled = false;
                    user.IsResourceOwner = isResourceOwner;

                    var x = await _userManager.UpdateAsync(user);

                    if (x.Succeeded)
                    {
                        var identityRole = await _roleManager.FindByIdAsync(roleId);

                        if (identityRole == null)
                            return 0;
                        var existingRoles = await _userManager.GetRolesAsync(user);

                        foreach (var role in existingRoles)
                        {
                            await _userManager.RemoveFromRoleAsync(user, role);
                        }

                        if (!await _userManager.IsInRoleAsync(user, identityRole.Name))
                            await _userManager.AddToRoleAsync(user, identityRole.Name);

                        return 1;
                    }
                }
            }

            return 0;
        }

        public async Task<int> CreateWithUserAccountAsync(Resource resource, bool createLogin, string roleId, bool isResourceOwner = false, string password = null)
        {
            var result = await _resourceRepository.CreateAsync(resource);
            if (result == 0)
                return 0;

            if (createLogin)
            {
                return await CreateUserAccountAsync(resource, roleId, isResourceOwner, password);
            }
            else
            {
                return 1;
            }
        }

        public async Task<int> UpdateUserAccountAsync(Guid resourceId, Resource resource, bool createLogin, string roleId, bool isResourceOwner = false, string password = null)
        {
            var result = await _resourceRepository.GetByIdAsync(resourceId);
            if (result == null)
                return 0;

            if (result.Email != resource.Email)
            {
                throw new Exception("Email cannot be changed");
            }

            int result1 = await _resourceRepository.UpdateAsync(resourceId, resource);

            if (result1 > 0)
            {
                return await UpdateUserAccountAsync(resource, createLogin, roleId, isResourceOwner, password);
            }
            else
            {
                return 0;
            }
        }

        public PagedList<Resource> GetAllCachedAsync(PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null)
        {
            return _resourceRepository.GetAllCachedAsync(pagingParams, whereExpression, orderByExpression);
        }

        public Task<int> DeleteUserAsync(Guid resourceId)
        {
            throw new NotImplementedException();
        }

        public PagedList<Resource> GetAllByRoleNameAsync(string roleName, PagingParams pagingParams = null, Expression<Func<Resource, bool>> whereExpression = null, Expression<Func<Resource, string>> orderByExpression = null)
        {
            return _resourceRepository.GetAllByRoleNameAsync(roleName, pagingParams, whereExpression, orderByExpression);
            //throw new NotImplementedException();
        }

        public async Task<List<SimpleObject>> GetAllManagers()
        {
            return await _resourceRepository.GetAllManagers();
        }

        public async Task<List<SimpleObject>> GetAllResourceOwners()
        {
            return await _resourceRepository.GetAllResourceOwners();
        }

        public async Task<List<SimpleObject>> GetAllUsers()
        {
            return await _resourceRepository.GetAllUsers();
        }

        public PagedList<ResourceDto> GetMyResources(Guid? managerId, AllocType allocType, DateTime startDate,
            DateTime endDate, PagingParams pagingParams = null, string name = null, string designation = null, Guid? skillsetId = null)
        {
            return _resourceRepository.GetMyResources(managerId, allocType, startDate, endDate, pagingParams, name, designation, skillsetId);
        }
    }
}