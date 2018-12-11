using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public class ProjectTechstack : BaseModel
    {
        public Guid ProjectId { get; set; }
        public Guid TechstackId { get; set; }

        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; }

        [ForeignKey("TechstackId")]
        public virtual Techstack Techstack { get; set; }
    }
}