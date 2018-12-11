using FFive.Data.Models.Enums;
using System;

namespace FFive.Data.ViewModels
{
    public class ProjectResourceCreate
    {
        public Guid? ProjectResourceId { get; set; }
        public Guid ProjectId { get; set; }
        public Guid ResourceId { get; set; }
        public DateTime AllocationStartDate { get; set; }
        public DateTime AllocationEndDate { get; set; }
        public int AllocationPercent { get; set; }
        public Status Status { get; set; }
        public Guid AllocationTypeId { get; set; }
        public Guid ProjectLocationBillingRoleId { get; set; }
    }
}