using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Polly;
using StackExchange.Redis;
using System;

namespace FFive.Services.Impl
{
    public class RedisCacheService : ICacheService
    {
        private static IDatabase db;
        private readonly Policy _retryPolicy;
        private int maxRetryAttempts = 3;
        private TimeSpan pauseBetweenFailures = TimeSpan.FromSeconds(2);

        public RedisCacheService(ILogger logger)
        {
            db = Redis.Connection.GetDatabase();
            _retryPolicy = Policy
                .Handle<RedisTimeoutException>()
                .WaitAndRetryAsync(maxRetryAttempts, i => pauseBetweenFailures);
        }

        public T Get<T>(string key, ref bool hasValue)
        {
            var serializedItem = _retryPolicy.Execute(() => db.StringGet(key));
            var item = JsonConvert.DeserializeObject<T>(serializedItem);
            if (item == null)
                return default(T);
            return item;
        }

        public void Set(string key, object data, int cacheTime)
        {
            var expiresIn = TimeSpan.FromMinutes(cacheTime);
            var serializedItem = JsonConvert.SerializeObject(data);
            _retryPolicy.Execute(() => db.StringSet(key, serializedItem, expiresIn));
        }
    }
}