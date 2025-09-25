using Microsoft.EntityFrameworkCore;
using ProductApi.Models;

namespace ProductApi.Data.Helpers
{
    public static class DetachExtension
    {
        public static void DetachLocal<T>(this DbContext context, T? t, int entryId) 
        where T : class, IIdentifier
        {
            if (t is not null)
            {
                var local = context.Set<T>().Local.FirstOrDefault(entry => entry.Id.Equals(entryId));

                if (local != null)
                {
                    context.Entry(local).State = EntityState.Detached;
                }
            }
        }
    }
}
