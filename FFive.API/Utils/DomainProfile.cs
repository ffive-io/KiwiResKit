using AutoMapper;
using FFive.Data.Models;
using FFive.Data.ViewModels;

namespace FFive.API.Utils
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            AllowNullDestinationValues = true;
            CreateMap<Client, ClientCreate>().ReverseMap();
            CreateMap<Client, ClientUpdate>().ReverseMap();
            CreateMap<ClientContact, ClientContactCreate>().ReverseMap();
            CreateMap<Project, ProjectCreate>().ReverseMap();
            CreateMap<Resource, ResourceCreate>().ReverseMap();
            CreateMap<Platform, SimpleCreate>().ReverseMap();
            CreateMap<ProjectResource, ProjectResourceCreate>().ReverseMap();
            CreateMap<ProjectLocationBillingRole, ProjectLocationBillingRoleCreate>().ReverseMap();
        }
    }
}