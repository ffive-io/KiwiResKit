namespace FFive.Services
{
    public interface ICacheService
    {
        T Get<T>(string key, ref bool hasValue);

        void Set(string key, object data, int cacheTime);
    }
}