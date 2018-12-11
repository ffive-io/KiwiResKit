using FFive.Data.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FFive.Services
{
    public interface IAuthService
    {
        Task<TokenResponse> GetToken(TokenRequest tokenRequest);

        Task<TokenResponse> GetTokenForSocial(string provider, string email);

        Task<TokenResponse> GetToken(string refreshToken);

        Task<List<SimpleObject>> GetAllRoles();
    }
}