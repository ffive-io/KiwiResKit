using FFive.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class LocationBillingRoleRepository : GenericRepository<LocationBillingRole, string>, IGenericRepository<LocationBillingRole, string>
    {
        private readonly AppDbContext _appDbContext;

        public LocationBillingRoleRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public new PagedList<LocationBillingRole> GetAllAsync(PagingParams pagingParams = null, Expression<Func<LocationBillingRole, bool>> whereExpression = null, Expression<Func<LocationBillingRole, string>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var query = _appDbContext.LocationBillingRoles
               .Include(a => a.Location)
               .AsQueryable();

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<LocationBillingRole>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public new async Task<List<LocationBillingRole>> GetAllWithoutPaginationAsync()
        {
            return await _appDbContext.LocationBillingRoles
               .Include(a => a.Location).ToListAsync();
        }
    }
}