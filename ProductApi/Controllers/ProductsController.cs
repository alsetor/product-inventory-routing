using Microsoft.AspNetCore.Mvc;
using ProductApi.Models;
using ProductApi.Repositories;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductRepository repo, ILogger<ProductsController> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _repo.GetAllAsync());

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Product>> Get(Guid id)
        {
            var p = await _repo.GetAsync(id);
            if (p == null) return NotFound();
            return Ok(p);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _repo.CreateAsync(product);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _repo.UpdateAsync(id, product)) return NotFound();
            return Ok(product);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (!await _repo.DeleteAsync(id)) return NotFound();
            return NoContent();
        }
    }
}
