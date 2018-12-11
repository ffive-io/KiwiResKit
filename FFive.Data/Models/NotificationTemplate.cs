using System.ComponentModel.DataAnnotations;

namespace FFive.Data.Models
{
    public class NotificationTemplate : BaseModel
    {
        [StringLength(20)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Key { get; set; }

        [StringLength(500)]
        public string EmailSubjectTemplate { get; set; }

        [StringLength(500)]
        public string EmailBodyTemplate { get; set; }

        [StringLength(500)]
        public string SMSTemplate { get; set; }

        [StringLength(5000)]
        public string WebTemplate { get; set; }

        public bool IsWebEnabled { get; set; }
        public bool IsEmailEnabled { get; set; }
        public bool IsSMSEnabled { get; set; }
    }

    public enum NotificationType
    {
        Info = 1,
        Action = 2
    }
}