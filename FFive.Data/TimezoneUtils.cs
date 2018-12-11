using System;

namespace FFive.Data
{
    public static class TimezoneUtils
    {
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

        public static DateTime ConvertToIST(this DateTime dateTime)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(dateTime, INDIAN_ZONE);
        }
    }
}