using FFive.Data.Models.Auth;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models
{
    public abstract class NotificationBaseModel : BaseModel
    {
        public string UserId { get; set; }
        public Guid NotificationId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        [ForeignKey("NotificationId")]
        public virtual NotificationTemplate NotificationTemplate { get; set; }
    }
}