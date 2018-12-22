using System;
using System.Collections.Generic;

namespace FFive.Data.ViewModels
{
    public class ResourceDto
    {
        public Guid? ResourceId { get; set; }
        public string EmpCode { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Skill { get; set; }
        public string ReportingManager { get; set; }
        public string ResourceOwner { get; set; }
        public Guid? ReportingManagerId { get; set; }
        public Guid? ResourceOwnerId { get; set; }
        public bool IsMyResource { get; set; }
        public int TotalDays { get; set; }
        public int AvailableFullDays { get; set; }
        public int TotalAllocationPerc { get; set; }
        public List<AllocatedProject> AllocatedProjects { get; set; }
    }

    public class AllocatedProject
    {
        public Guid ProjectResourceId { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int AllocationPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string AllocationType { get; set; }
        public Guid AllocationTypeId { get; set; }
        public Guid ProjectLocationBillingRoleId { get; set; }
        public DateTime StartDateFilter { get; set; }
        public DateTime EndDateFilter { get; set; }
    }
}