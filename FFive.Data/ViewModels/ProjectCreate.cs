using System;

namespace FFive.Data.ViewModels
{
    public class ProjectCreate
    {
        public Guid? Id { get; set; }
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
        public Guid? OperationHeadId { get; set; }
        public Guid ProjectHeadId { get; set; }
        public string Overview { get; set; }
    }
}