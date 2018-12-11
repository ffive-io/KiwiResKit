using System;
using System.ComponentModel.DataAnnotations;

namespace FFive.Data.ViewModels
{
    public class SimpleCreate
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public Guid? Id { get; set; }
    }
}