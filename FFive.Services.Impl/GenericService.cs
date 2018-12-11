using FFive.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace FFive.Services.Impl
{
    public class GenericService<TEntity, TOrderBy> : IGenericService<TEntity, TOrderBy> where TEntity : class
    {
        private readonly IGenericRepository<TEntity, TOrderBy> _genericRepository;

        public GenericService(IGenericRepository<TEntity, TOrderBy> genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public async Task<int> CreateAsync(TEntity entity)
        {
            return await _genericRepository.CreateAsync(entity);
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            return await _genericRepository.DeleteAsync(id);
        }

        public async Task<List<TEntity>> GetAllWithoutPaginationAsync()
        {
            return await _genericRepository.GetAllWithoutPaginationAsync();
        }

        public PagedList<TEntity> GetAllAsync(PagingParams pagingParams = null, Expression<Func<TEntity, bool>> whereExpression = null, Expression<Func<TEntity, TOrderBy>> orderByExpression = null)
        {
            return _genericRepository.GetAllAsync(pagingParams, whereExpression, orderByExpression);
        }

        public async Task<TEntity> GetByIdAsync(Guid id)
        {
            return await _genericRepository.GetByIdAsync(id);
        }

        public async Task<int> UpdateAsync(Guid id, TEntity entity)
        {
            return await _genericRepository.UpdateAsync(id, entity);
        }
    }
}