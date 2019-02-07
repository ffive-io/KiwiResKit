using StackExchange.Redis;
using System;

namespace FFive.Services.Impl
{
    public static class Redis
    {
        private static string redisHost = "127.0.0.1";
        private static int redisPort = 6397;
        private static string redisPassword = "admin123";
        private static string redisConnection = string.Format("{0}:{1},password={2}", redisHost, redisPort, redisPassword);
        private static string connectionString = redisConnection + ",syncTimeout=30000,connectTimeout=30000,ssl=False,abortConnect=False,allowAdmin=true";

        private static Lazy<ConnectionMultiplexer> multiplexer = CreateMultiplexer();

        public static ConnectionMultiplexer Connection
        {
            get
            {
                return multiplexer.Value;
            }
        }

        private static Lazy<ConnectionMultiplexer> CreateMultiplexer()
        {
            return new Lazy<ConnectionMultiplexer>(() => ConnectionMultiplexer.Connect(connectionString));
        }
    }
}