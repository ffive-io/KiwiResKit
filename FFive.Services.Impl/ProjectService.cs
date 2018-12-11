using FFive.Data.Models;
using FFive.Data.Repositories;
using FFive.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FFive.Services.Impl
{
    public class ProjectService : GenericService<Project, string>, IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository) : base(projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<List<SimpleObject>> GetAllProjects()
        {
            return await _projectRepository.GetAllProjects();
        }

        public async Task<List<SimpleObject>> GetAllBillingRolesByProjectId(Guid projectId)
        {
            return await _projectRepository.GetAllBillingRolesByProjectId(projectId);
        }
    }
}