using API.Data;
using API.Entities;
using API.Middleware;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configure listening port (default 8080 or from PORT environment variable for Render/Docker)
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://*:{port}");

// Ensure DataProtection keys are stored in a writable path in Linux containers (/tmp/dp-keys)
var keysPath = Environment.GetEnvironmentVariable("DATA_PROTECTION_KEYS_PATH") 
    ?? Path.Combine(Path.GetTempPath(), "dp-keys");
if (!Directory.Exists(keysPath))
{
    Directory.CreateDirectory(keysPath);
}
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(keysPath));

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MappingProfiles>();
});

builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("Cloudinary"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure database connection: use SQLite with writable /tmp/store.db by default or SQL Server if configured
var envConn = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection");
var dbPath = Environment.GetEnvironmentVariable("DB_PATH") ?? "/tmp/store.db";

var dbDir = Path.GetDirectoryName(dbPath);
if (!string.IsNullOrEmpty(dbDir) && !Directory.Exists(dbDir))
{
    Directory.CreateDirectory(dbDir);
}

builder.Services.AddDbContext<StoreContext>(opt =>
{
    if (!string.IsNullOrEmpty(envConn))
    {
        if (envConn.Contains("Server=") || envConn.Contains("Database="))
        {
            opt.UseSqlServer(envConn);
        }
        else
        {
            var sqliteConn = envConn.StartsWith("Data Source=", StringComparison.OrdinalIgnoreCase)
                ? envConn
                : $"Data Source={envConn}";
            opt.UseSqlite(sqliteConn);
        }
    }
    else
    {
        opt.UseSqlite($"Data Source={dbPath}");
    }
});

builder.Services.AddCors();

builder.Services.AddTransient<ExceptionMiddleware>();

builder.Services.AddIdentityApiEndpoints<User>(options =>
{
    options.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreContext>();

builder.Services.AddScoped<PaymentsService>();
builder.Services.AddScoped<ImageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();

app.UseMiddleware<ExceptionMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
    ?? builder.Configuration["AllowedOrigins"]?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? ["https://restore-sooty.vercel.app"];

app.UseCors(opt =>
{
    opt.WithOrigins(allowedOrigins)
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()
       .WithExposedHeaders("Pagination");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

app.MapFallbackToController("Index", "Fallback");

await DbInitializer.InitDb(app);

app.Run();