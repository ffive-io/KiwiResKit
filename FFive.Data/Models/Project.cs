using FFive.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class Project : BaseModel
    {
        [StringLength(255)]
        public string Name { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }

        public Guid PlatformId { get; set; }
        public Guid ProjectTypeId { get; set; }
        public Guid? ParentProjectId { get; set; }
        public Guid ClientId { get; set; }
        public Guid ClientContactId { get; set; }
        public Guid TechstackId { get; set; }

        public Status Status { get; set; }
        public Guid? OperationHeadId { get; set; }
        public Guid? ProjectHeadId { get; set; }

        [StringLength(5000)]
        public string Overview { get; set; }

        [ForeignKey("PlatformId")]
        public virtual Platform Platform { get; set; }

        [ForeignKey("ProjectTypeId")]
        public virtual ProjectType ProjectType { get; set; }

        [ForeignKey("ParentProjectId")]
        public virtual Project ParentProject { get; set; }

        [ForeignKey("ClientId")]
        public virtual Client Client { get; set; }

        [ForeignKey("ClientContactId")]
        public virtual ClientContact ClientContact { get; set; }

        [ForeignKey("TechstackId")]
        public virtual Techstack Techstack { get; set; }

        [ForeignKey("OperationHeadId")]
        public virtual Resource OperationHead { get; set; }

        [ForeignKey("ProjectHeadId")]
        public virtual Resource ProjectHead { get; set; }

        public virtual IList<ProjectResource> ProjectResources { get; set; }
        public virtual IList<ProjectLocationBillingRole> ProjectLocationBillingRoles { get; set; }
    }
}