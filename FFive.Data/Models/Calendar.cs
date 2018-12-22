using System;
using System.ComponentModel.DataAnnotations;

namespace FFive.Data.Models
{
    public class Calendar
    {
        [Key]
        public DateTime MyDate { get; set; }
    }
}