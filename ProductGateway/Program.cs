using ProductGateway.Helpers;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
var mode = config["RoutingOptions:Mode"];

builder.Services.AddReverseProxy()
    .LoadFromConfig(config.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy(proxyPipeline =>
{
    proxyPipeline.Use((context, next) =>
    {
        var path = context.Request.Path.Value;
        if (path != null && path.EndsWith(".aspx"))
        {
            var productId = ExtractHelper.ExtractProductId(path);
            if (mode == "redirect")
            {
                context.Response.Redirect($"/products/{productId}", permanent: true);
                return Task.CompletedTask;
            }
            context.Request.Path = $"/products/{productId}";
        }

        return next();
    });
});

app.Run();
