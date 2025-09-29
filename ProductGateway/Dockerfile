# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ProductGateway/*.csproj ./ProductGateway/
WORKDIR /src/ProductGateway
RUN dotnet restore

COPY ProductGateway/. ./
WORKDIR /src/ProductGateway
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:7045
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 7045

ENTRYPOINT ["dotnet", "ProductGateway.dll"]