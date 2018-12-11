using FFive.Data.Models;
using FFive.Data.Repositories;
using System.Threading.Tasks;

namespace FFive.Services.Impl
{
    public class ProjectResourceService : GenericService<ProjectResource, string>, IGenericService<ProjectResource, string>
    {
        private readonly IProjectResourceRepository _projectResourceRepository;

        public ProjectResourceService(IProjectResourceRepository projectResourceRepository) : base(projectResourceRepository)
        {
            _projectResourceRepository = projectResourceRepository;
        }

        public new async Task<int> CreateAsync(ProjectResource entity)
        {
            return await _projectResourceRepository.CreateAsync(entity);
        }
    }
}