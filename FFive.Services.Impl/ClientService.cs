using FFive.Data.Models;
using FFive.Data.Repositories;

namespace FFive.Services.Impl
{
    public class ClientService : GenericService<Client, string>, IClientService
    {
        private readonly IClientRepository _clientRepository;

        public ClientService(IClientRepository clientRepository) : base(clientRepository)
        {
            _clientRepository = clientRepository;
        }
    }
}