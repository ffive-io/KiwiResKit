using FFive.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Services
{
    public interface IGenericService<TEntity, TOrderBy> where TEntity : class
    {
        PagedList<TEntity> GetAllAsync(PagingParams pagingParams = null, Expression<Func<TEntity, bool>> whereExpression = null, Expression<Func<TEntity, TOrderBy>> orderByExpression = null);

        Task<List<TEntity>> GetAllWithoutPaginationAsync();

        Task<TEntity> GetByIdAsync(Guid resourceId);

        Task<int> CreateAsync(TEntity resource);

        Task<int> UpdateAsync(Guid resourceId, TEntity resource);

        Task<int> DeleteAsync(Guid resourceId);
    }
}