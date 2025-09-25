using ProductApi.Models;

namespace ProductApi.Repositories
{
    public interface IProductRepository
    {
        Task <IEnumerable<Product>> GetAllAsync();
        Task <Product?> GetAsync(Guid id);
        Task <Product> CreateAsync(Product p);
        Task <bool> UpdateAsync(Guid id, Product p);
        Task <bool> DeleteAsync(Guid id);
    }
}
