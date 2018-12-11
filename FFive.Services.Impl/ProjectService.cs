using FFive.Data.Models;
using FFive.Data.Repositories;

namespace FFive.Services.Impl
{
    public class ProjectService : GenericService<Project, string>, IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository) : base(projectRepository)
        {
            _projectRepository = projectRepository;
        }
    }
}