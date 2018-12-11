using FFive.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class GenericRepository<TEntity, TOrderBy> : IGenericRepository<TEntity, TOrderBy> where TEntity : class
    {
        private readonly AppDbContext _appDbContext;

        public GenericRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<TEntity>> GetAllWithoutPaginationAsync()
        {
            return await _appDbContext.Set<TEntity>().ToListAsync();
        }

        public PagedList<TEntity> GetAllAsync(PagingParams pagingParams = null, Expression<Func<TEntity, bool>> whereExpression = null, Expression<Func<TEntity, TOrderBy>> orderByExpression = null)
        {
            if (pagingParams == null)
                pagingParams = new PagingParams();

            var query = _appDbContext.Set<TEntity>().AsQueryable();

            if (orderByExpression != null)
                query = query.OrderBy(orderByExpression);

            if (whereExpression != null)
                query = query.Where(whereExpression);

            return new PagedList<TEntity>(query, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public async Task<TEntity> GetByIdAsync(Guid id)
        {
            return await _appDbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<int> CreateAsync(TEntity entity)
        {
            await _appDbContext.Set<TEntity>().AddAsync(entity);
            return await _appDbContext.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(Guid id, TEntity entity)
        {
            if (entity == null)
                return 0;
            TEntity exist = _appDbContext.Set<TEntity>().Find(id);
            if (exist != null)
            {
                _appDbContext.Entry(exist).CurrentValues.SetValues(entity);
                return await _appDbContext.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _appDbContext.Set<TEntity>().Remove(entity);
                return await _appDbContext.SaveChangesAsync();
            }
            return 0;
        }
    }
}