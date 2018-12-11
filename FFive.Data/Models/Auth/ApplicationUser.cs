using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public bool IsEnabled { get; set; }
        public Guid ResourceId { get; set; }
        public bool IsResourceOwner { get; set; }

        [ForeignKey("ResourceId")]
        public virtual Resource ResourceUser { get; set; }
    }
}