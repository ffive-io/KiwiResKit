namespace FFive.Data
{
    public static class Extensions
    {
        public const string AdminClaim = "admin";
        public const string UserClaim = "user";
        public const string AgeClaim = "age";
        public const string ManageUserClaim = "manage_user";

        public const string CxoRole = "cxo";
        public const string AdminRole = "admin";
        public const string ProjHeadRole = "projecthead";
        public const string OpsHeadRole = "opshead";
        public const string PreSalesRole = "presales";
        public const string UserRole = "user";

        public const string RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    }
}