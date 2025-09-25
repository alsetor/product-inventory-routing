# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# copy csproj and restore as distinct layers
COPY ProductApi/*.csproj ./ProductApi/
WORKDIR /src/ProductApi
RUN dotnet restore

# copy everything else and build
COPY ProductApi/. ./ProductApi/
WORKDIR /src/ProductApi
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Use a non-root user if you like (optional)
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

# Ensure Kestrel listens on port 5001
ENV ASPNETCORE_URLS=http://+:5001
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 5001

ENTRYPOINT ["dotnet", "ProductApi.dll"]