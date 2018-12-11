using FFive.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class Resource : BaseModel
    {
        [StringLength(10)]
        public string EmpCode { get; set; }

        [StringLength(255)]
        public string FirstName { get; set; }

        [StringLength(255)]
        public string LastName { get; set; }

        [StringLength(255)]
        public string Designation { get; set; }

        [StringLength(255)]
        public string Department { get; set; }

        [StringLength(50)]
        public string Phonenumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public DateTime JoiningDate { get; set; }
        public DateTime? RelievingDate { get; set; }

        [StringLength(500)]
        public string VocationPlan { get; set; }

        public Guid? SkillsetId { get; set; }
        public Status Status { get; set; }

        public Guid? ManagerId { get; set; }

        [ForeignKey("ManagerId")]
        public virtual Resource Manager { get; set; }

        public virtual HashSet<Resource> Reportees { get; set; }

        public Guid? ResourceOwnerId { get; set; }

        [ForeignKey("ResourceOwnerId")]
        public virtual Resource ResourceOwner { get; set; }

        public virtual HashSet<Resource> Resources { get; set; }

        [ForeignKey("SkillsetId")]
        public virtual Skillset Skillset { get; set; }

        public virtual IList<ProjectResource> ProjectResources { get; set; }
    }
}