using ProductApi.Models;

namespace ProductApi.Data.Helpers
{
    public static class DbSeeder
    {
        public static void SeedFromJson(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ProductDbContext>();

            if (context.Products.Any())
                return;

            var products = new List<Product>();
            for (int i = 1; i <= 20; i++)
            {
                products.Add(new Product
                {
                    Id = Guid.NewGuid(),
                    Name = $"Product {i}",
                    Description = $"Description for product {i}",
                    Price = 10.0m * i,
                    Quantity = 5 * i
                });
            }

            context.Products.AddRange(products);
            context.SaveChangesAsync();
        }
    }
}
