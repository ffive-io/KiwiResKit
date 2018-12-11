using FFive.Data.Models;
using FFive.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;

namespace FFive.Data.IOC
{
    public static class ServiceCollectionExtensions
    {
        public static void AddDataAccessServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContextPool<AppDbContext>( // replace "YourDbContext" with the class name of your DbContext
                options => options.UseMySql(connectionString,
                    mysqlOptions =>
                    {
                        mysqlOptions.ServerVersion(new Version(5, 5, 45), ServerType.MySql); // replace with your Server Version and Type
                    }
            ).UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll));
        }

        public static IServiceCollection AddInternalRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));
            services.AddScoped<IGenericRepository<LocationBillingRole, string>, LocationBillingRoleRepository>();
            services.AddScoped<IResourceRepository, ResourceRepository>();
            services.AddScoped<ITokenRepository, TokenRepository>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IProjectResourceRepository, ProjectResourceRepository>();

            return services;
        }
    }
}