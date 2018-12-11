namespace FFive.Data.Models
{
    public class UserNotification : NotificationBaseModel
    {
        public SendStatus EmailStatus { get; set; }
        public SendStatus SmsStatus { get; set; }
        public SendStatus WebStatus { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public string Email { get; set; }
        public string SmsBody { get; set; }
        public string Phonenumber { get; set; }
        public string WebBody { get; set; }
    }

    public enum SendStatus
    {
        Pending = 1,
        Queued = 2,
        Send = 3,
        Failed = 4,
        Read = 5
    }
}