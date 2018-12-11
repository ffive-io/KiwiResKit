using FFive.Data.Repositories;
using System;
using System.Linq.Expressions;

namespace FFive.Services
{
    public interface IGenericCacheService<TEntity, TOrderBy> where TEntity : class
    {
        PagedList<TEntity> GetAllCachedAsync(PagingParams pagingParams = null, Expression<Func<TEntity, bool>> whereExpression = null, Expression<Func<TEntity, TOrderBy>> orderByExpression = null);
    }
}