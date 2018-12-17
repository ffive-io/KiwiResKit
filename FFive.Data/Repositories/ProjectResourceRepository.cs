using FFive.Data.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace FFive.Data.Repositories
{
    public class ProjAllocation
    {
        public Guid ProjectResourceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int AllocationPercent { get; set; }
    }

    public class ProjectResourceRepository : GenericRepository<ProjectResource, string>, IProjectResourceRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProjectResourceRepository(AppDbContext appDbContext) : base(appDbContext)
        {
            _appDbContext = appDbContext;
        }

        private int GetMaxAllocationInDateRange(List<ProjAllocation> allocations, DateTime startDate, DateTime endDate)
        {
            int maxAllocationPercent = 0;
            foreach (DateTime day in EachDay(startDate, endDate))
            {
                Debug.WriteLine(day);
                var perDayRecords = allocations.Where(a => day <= a.EndDate && day >= a.StartDate);
                int tmpMax = 0;
                foreach (var item in perDayRecords)
                {
                    Debug.WriteLine(item.AllocationPercent);
                    tmpMax = tmpMax + item.AllocationPercent;
                }
                if (tmpMax > maxAllocationPercent)
                {
                    maxAllocationPercent = tmpMax;
                }
            }

            return maxAllocationPercent;
        }

        private IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }

        public new async Task<int> CreateAsync(ProjectResource entity)
        {
            var existingAllocationList = _appDbContext.ProjectResources
                .Where(a => a.ResourceId == entity.ResourceId)
                .Where(a => (entity.AllocationStartDate <= a.AllocationEndDate &&
                entity.AllocationEndDate >= a.AllocationStartDate))
                .Select(a => new ProjAllocation
                {
                    StartDate = a.AllocationStartDate,
                    EndDate = a.AllocationEndDate,
                    AllocationPercent = a.AllocationPercent
                }).ToList();

            int maxAllo = GetMaxAllocationInDateRange(existingAllocationList, entity.AllocationStartDate, entity.AllocationEndDate);

            Debug.WriteLine("maxAll " + maxAllo.ToString());

            if ((entity.AllocationPercent + maxAllo) <= 100)
            {
                await _appDbContext.ProjectResources.AddAsync(entity);
                return await _appDbContext.SaveChangesAsync();
            }
            else
            {
                throw new System.Exception("Cannot allocate resource more than 100%");
            }
        }

        public new async Task<int> UpdateAsync(Guid id, ProjectResource entity)
        {
            var currentAllocation = await _appDbContext.ProjectResources.FindAsync(id);

            var existingAllocationList = _appDbContext.ProjectResources
                .Where(a => a.ResourceId == entity.ResourceId)
                .Where(a => (entity.AllocationStartDate <= a.AllocationEndDate &&
                entity.AllocationEndDate >= a.AllocationStartDate))
                .Select(a => new ProjAllocation
                {
                    ProjectResourceId = a.Id,
                    StartDate = a.AllocationStartDate,
                    EndDate = a.AllocationEndDate,
                    AllocationPercent = a.AllocationPercent
                }).ToList();

            for (int i = existingAllocationList.Count - 1; i >= 0; i--)
            {
                if (existingAllocationList[i].ProjectResourceId == currentAllocation.Id)
                    existingAllocationList.RemoveAt(i);
            }

            //foreach (var item in existingAllocationList)
            //{
            //    if (item.ProjectResourceId == currentAllocation.Id)
            //        existingAllocationList.Remove(item);
            //}

            int maxAllo = GetMaxAllocationInDateRange(existingAllocationList, entity.AllocationStartDate, entity.AllocationEndDate);

            Debug.WriteLine("maxAll " + maxAllo.ToString());

            if ((entity.AllocationPercent + maxAllo) <= 100)
            {
                _appDbContext.ProjectResources.Remove(currentAllocation);
                await _appDbContext.ProjectResources.AddAsync(entity);
                return await _appDbContext.SaveChangesAsync();
            }
            else
            {
                throw new System.Exception("Cannot allocate resource more than 100%");
            }
        }
    }
}