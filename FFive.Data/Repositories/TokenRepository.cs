using FFive.Data.Models;
using FFive.Data.Models.Auth;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class TokenRepository : GenericRepository<RefreshToken, string>, ITokenRepository
    {
        private readonly AppDbContext _appDbContext;

        public TokenRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<RefreshToken> GetByUserIdAsync(string userId)
        {
            return await _appDbContext.RefreshTokens.Include(a => a.User).FirstOrDefaultAsync(a => a.UserId == userId);
        }

        public async Task<RefreshToken> GetByTokenAsync(string refreshToken)
        {
            return await _appDbContext.RefreshTokens.Include(a => a.User).FirstOrDefaultAsync(a => a.Token == refreshToken);
        }
    }
}