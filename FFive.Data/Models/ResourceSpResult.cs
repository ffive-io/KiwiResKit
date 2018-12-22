using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class ResourceSpResult
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ResourceId { get; set; }

        public string ResourceName { get; set; }
        public string Designation { get; set; }
        public string Skillset { get; set; }
        public string ReportingManager { get; set; }
        public string ResourceOwner { get; set; }
        public int TotalDays { get; set; }
        public int Available100Days { get; set; }
        public decimal TotalAllocationPerc { get; set; }
    }
}