using System;
using System.Collections.Generic;

namespace FFive.Data.ViewModels
{
    public class ProjectDto
    {
        public Guid? ProjectId { get; set; }
        public string ProjectName { get; set; }
        public Guid ClientId { get; set; }
        public string ClientName { get; set; }
        public Guid ProjectTypeId { get; set; }
        public string ProjectType { get; set; }
        public Guid PlatformId { get; set; }
        public string Platform { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public Guid? OperationHeadId { get; set; }
        public Guid? ProjectHeadId { get; set; }
        public string OperationHead { get; set; }
        public string ProjectHead { get; set; }
        public string ProjectStatus { get; set; }
        public int NoOfResource { get; set; }
        public List<ProjectResourceDto> ProjectResources { get; set; }
        public List<ProjectLocationBillingRoleCreate> ProjectLocationBillingRoles { get; set; }
    }

    public class ProjectResourceDto
    {
        public Guid resourceId { get; set; }
        public string ProjectRole { get; set; }
        public string BillingType { get; set; }
        public string ResourceName { get; set; }
        public string Designation { get; set; }
        public int AllocationPercentage { get; set; }
        public DateTime AllocationStartDate { get; set; }
        public DateTime AllocationEndDate { get; set; }
        public string ReportingManager { get; set; }
        public string ResourceOwner { get; set; }
    }
}