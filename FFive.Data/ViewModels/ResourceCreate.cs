using FFive.Data.Models.Enums;
using System;

namespace FFive.Data.ViewModels
{
    public class ResourceCreate
    {
        public Guid? Id { get; set; }
        public string EmpCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime? RelievingDate { get; set; }
        public string VocationPlan { get; set; }
        public Guid? ManagerId { get; set; }
        public Guid? ResourceOwnerId { get; set; }
        public string Department { get; set; }
        public string Phonenumber { get; set; }
        public Guid? SkillsetId { get; set; }
        public Status? Status { get; set; }
        public bool CreateLogin { get; set; }
        public Guid? RoleId { get; set; }
        public bool? IsResourceOwner { get; set; }
        public string Password { get; set; }
    }
}