using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class LocationBillingRole : BaseModel
    {
        public Guid LocationId { get; set; }

        [ForeignKey("LocationId")]
        public virtual Location Location { get; set; }

        [StringLength(255)]
        public string BillingRole { get; set; }

        public double RatePerHour { get; set; }
        public double RatePerMonth { get; set; }

        [StringLength(10)]
        public string Currency { get; set; }
    }
}