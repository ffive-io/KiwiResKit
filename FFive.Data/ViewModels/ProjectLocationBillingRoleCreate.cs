using System;

namespace FFive.Data.ViewModels
{
    public class ProjectLocationBillingRoleCreate
    {
        public Guid ProjectId { get; set; }
        public Guid LocationBillingRoleId { get; set; }
        public Double RatePerHour { get; set; }
        public Double RatePerMonth { get; set; }
    }
}