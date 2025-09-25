using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;

namespace ProductApi.Repositories
{
    public class EfCoreProductRepository : IProductRepository
    {
        private readonly ProductDbContext _context;

        public EfCoreProductRepository(ProductDbContext context)
        {
            _context = context;
            SeedProductsAsync();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products
                .ToListAsync();
        }

        public async Task<Product?> GetAsync(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> CreateAsync(Product p)
        {
            p.Id = Guid.NewGuid();
            _context.Products.Add(p);
            await _context.SaveChangesAsync();
            return p;
        }

        public async Task<bool> UpdateAsync(Guid id, Product p)
        {
            var existing = await _context.Products.FindAsync(id);
            if (existing == null) return false;

            existing.Name = p.Name;
            existing.Description = p.Description;
            existing.Price = p.Price;
            existing.Quantity = p.Quantity;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        // Add this method to seed 20 products
        private async Task SeedProductsAsync()
        {
            if (await _context.Products.AnyAsync())
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

            _context.Products.AddRange(products);
            await _context.SaveChangesAsync();
        }
    }
}