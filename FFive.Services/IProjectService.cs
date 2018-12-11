using FFive.Data.Models;
using FFive.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FFive.Services
{
    public interface IProjectService : IGenericService<Project, string>
    {
        Task<List<SimpleObject>> GetAllProjects();

        Task<List<SimpleObject>> GetAllBillingRolesByProjectId(Guid projectId);
    }
}