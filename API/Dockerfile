# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["API.csproj", "./"]
RUN dotnet restore "API.csproj"

# Copy source code and publish
COPY . .
RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render exposes PORT at runtime; default to 8080
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "API.dll"]
