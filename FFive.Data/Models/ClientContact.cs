using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class ClientContact : BaseModel
    {
        [StringLength(20)]
        public string Title { get; set; }

        [StringLength(255)]
        public string FirstName { get; set; }

        [StringLength(255)]
        public string LastName { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string ContactNumber { get; set; }

        [StringLength(255)]
        public string SkypeId { get; set; }

        [StringLength(255)]
        public string Designation { get; set; }

        public bool IsPointOfContact { get; set; }

        [StringLength(255)]
        public string StreetAddress { get; set; }

        [StringLength(255)]
        public string State { get; set; }

        [StringLength(255)]
        public string City { get; set; }

        [StringLength(7)]
        public string ZipCode { get; set; }

        public Guid LocationId { get; set; }

        [StringLength(255)]
        public string TimeZone { get; set; }

        public Guid ClientId { get; set; }

        [ForeignKey("ClientId")]
        public virtual Client Client { get; set; }
    }
}