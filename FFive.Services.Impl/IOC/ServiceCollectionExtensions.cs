using FFive.Data.Models;
using Microsoft.Extensions.DependencyInjection;

namespace FFive.Services.Impl.IOC
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInternalServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IResourceService, ResourceService>();
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped(typeof(IGenericService<,>), typeof(GenericService<,>));
            services.AddScoped<IGenericService<ProjectResource, string>, ProjectResourceService>();
            services.AddScoped<ICacheService, RedisCacheService>();
            return services;
        }
    }
}