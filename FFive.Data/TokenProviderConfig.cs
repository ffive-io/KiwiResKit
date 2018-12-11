namespace FFive.Data
{
    public class TokenProviderConfig
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string ExpirationMinutes { get; set; }
        public string CookieName { get; set; }
    }
}