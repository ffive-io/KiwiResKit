using FFive.Data.Repositories;
using System;
using System.Linq.Expressions;

namespace FFive.Data.Cache
{
    public interface IGenericCacheRepository<TEntity, TOrderBy> where TEntity : class
    {
        PagedList<TEntity> GetAllCachedAsync(PagingParams pagingParams = null, Expression<Func<TEntity, bool>> whereExpression = null, Expression<Func<TEntity, TOrderBy>> orderByExpression = null);
    }
}