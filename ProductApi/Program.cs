using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Data.Helpers;
using ProductApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseInMemoryDatabase("ProductInventoryDb"));

builder.Services.AddScoped<IProductRepository, EfCoreProductRepository>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDev", policy => policy
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod());
});

builder.Services.AddOpenApi();

var app = builder.Build();

DbSeeder.SeedFromJson(app);

app.UseCors("AllowDev");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
