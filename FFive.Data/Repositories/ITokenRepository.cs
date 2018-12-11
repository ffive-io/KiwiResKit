using FFive.Data.Models.Auth;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public interface ITokenRepository : IGenericRepository<RefreshToken, string>
    {
        Task<RefreshToken> GetByUserIdAsync(string userId);

        Task<RefreshToken> GetByTokenAsync(string refreshToken);
    }
}