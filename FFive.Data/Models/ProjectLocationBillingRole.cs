using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class ProjectLocationBillingRole : BaseModel
    {
        public Guid ProjectId { get; set; }
        public Guid LocationBillingRoleId { get; set; }

        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; }

        [ForeignKey("LocationBillingRoleId")]
        public virtual LocationBillingRole LocationBillingRole { get; set; }

        public Double RatePerHour { get; set; }
        public Double RatePerMonth { get; set; }
    }
}