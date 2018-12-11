using FFive.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class Client : BaseModel
    {
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
        public Status Status { get; set; }
        public DateTime StartDate { get; set; }
        public Guid? SalesContactId { get; set; }

        [ForeignKey("LocationId")]
        public virtual Location Location { get; set; }

        [ForeignKey("ClientTypeId")]
        public virtual ClientType ClientType { get; set; }

        [ForeignKey("SalesContactId")]
        public virtual Resource SalesContact { get; set; }

        public virtual List<Project> Projects { get; set; }

        public virtual List<ClientContact> ClientContacts { get; set; }
    }
}