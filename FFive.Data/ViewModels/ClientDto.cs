using System;
using System.ComponentModel.DataAnnotations;

namespace FFive.Data.ViewModels
{
    public class ClientDto
    {
        public Guid ClientId { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        public string StreetAddress { get; set; }

        [StringLength(255)]
        public string State { get; set; }

        [StringLength(255)]
        public string City { get; set; }

        [StringLength(7)]
        public string ZipCode { get; set; }

        public string Location { get; set; }
        public string ClientType { get; set; }
        public Models.Enums.Status? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public string SalesContact { get; set; }

        [StringLength(255)]
        public string CCName { get; set; }

        [StringLength(255)]
        public string CCEmail { get; set; }

        [StringLength(255)]
        public string CCContactNumber { get; set; }

        [StringLength(255)]
        public string CCTimeZone { get; set; }
    }
}