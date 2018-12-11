using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public interface IGenericRepository<TEntity, TOrderBy> where TEntity : class
    {
        PagedList<TEntity> GetAllAsync(PagingParams pagingParams = null, Expression<Func<TEntity, bool>> whereExpression = null, Expression<Func<TEntity, TOrderBy>> orderByExpression = null);

        Task<List<TEntity>> GetAllWithoutPaginationAsync();

        Task<TEntity> GetByIdAsync(Guid id);

        Task<int> CreateAsync(TEntity entity);

        Task<int> UpdateAsync(Guid id, TEntity entity);

        Task<int> DeleteAsync(Guid id);
    }
}