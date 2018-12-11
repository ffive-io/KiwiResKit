using FFive.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FFive.Data.ViewModels
{
    public class ClientCreate
    {
        public Guid? Id { get; set; }

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

        public Guid LocationId { get; set; }
        public Guid ClientTypeId { get; set; }
        public Status? Status { get; set; }
        public DateTime StartDate { get; set; }
        public Guid? SalesContactId { get; set; }

        public List<ClientContactCreate> ClientContacts { get; set; }
    }

    public class ClientUpdate
    {
        public Guid Id { get; set; }

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

        public Guid LocationId { get; set; }
        public Guid ClientTypeId { get; set; }
        public Status? Status { get; set; }
        public DateTime StartDate { get; set; }
        public Guid? SalesContactId { get; set; }
    }
}