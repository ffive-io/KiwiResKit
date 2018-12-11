using FFive.Data.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class ProjectResource : BaseModel
    {
        public Guid ProjectId { get; set; }
        public Guid ResourceId { get; set; }
        public DateTime AllocationStartDate { get; set; }
        public DateTime AllocationEndDate { get; set; }
        public int AllocationPercent { get; set; }
        public Status Status { get; set; }

        public Guid AllocationTypeId { get; set; }
        public Guid ProjectLocationBillingRoleId { get; set; }

        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; }

        [ForeignKey("ResourceId")]
        public virtual Resource Resource { get; set; }

        [ForeignKey("AllocationTypeId")]
        public virtual AllocationType AllocationType { get; set; }

        [ForeignKey("ProjectLocationBillingRoleId")]
        public virtual ProjectLocationBillingRole ProjectLocationBillingRole { get; set; }
    }
}