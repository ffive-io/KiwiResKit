using FFive.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class ClientRepository : GenericRepository<Client, string>, IClientRepository
    {
        private readonly AppDbContext _appDbContext;

        public ClientRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public new PagedList<Client> GetAllAsync(PagingParams pagingParams = null, Expression<Func<Client, bool>> whereExpression = null, Expression<Func<Client, string>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var query = _appDbContext.Clients.Include(a => a.ClientContacts).Include(a => a.SalesContact).Include(a => a.Location).Include(a => a.ClientType).AsQueryable();

            query = query.Where(a => a.ClientContacts.Any(y => y.IsPointOfContact == true));

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<Client>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public new async Task<Client> GetByIdAsync(Guid id)
        {
            return await _appDbContext.Clients
                .Include(a => a.ClientContacts)
                .Include(a => a.SalesContact)
                .Include(a => a.Location)
                .Include(a => a.ClientType)
                .Include(a => a.Projects)
                    .ThenInclude(a => a.ClientContact)
                .Include(a => a.Projects)
                    .ThenInclude(a => a.Platform)
                .Include(a => a.Projects)
                    .ThenInclude(a => a.ProjectType)
                .Include(a => a.Projects)
                    .ThenInclude(a => a.Techstack)
                .Include(a => a.Projects)
                    .ThenInclude(a => a.ProjectHead)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}