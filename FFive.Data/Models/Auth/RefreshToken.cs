using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FFive.Data.Models.Auth
{
    public class RefreshToken : BaseModel
    {
        public DateTime IssuedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }
        public string Token { get; set; }
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}