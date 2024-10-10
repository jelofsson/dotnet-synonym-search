var builder = WebApplication.CreateBuilder(args);

// Retrieve CORS allowed origins from environment variable
var corsAllowedOrigins = builder.Configuration.GetValue<string>("CORS_ALLOWED_ORIGINS")?.Split(',');

// Add services to the container.

// Register SynonymService as a Singleton. This ensures it's available throughout the application's lifetime.
builder.Services.AddSingleton<SynonymService>();

builder.Services.AddControllers();

// Configure CORS if `corsAllowedOrigins` has values
if (corsAllowedOrigins != null && corsAllowedOrigins.Length > 0)
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", builder =>
        {
            builder.WithOrigins(corsAllowedOrigins) // Use the origins from the environment variable
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
    });
}

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply the CORS policy
if (corsAllowedOrigins != null && corsAllowedOrigins.Length > 0)
{
    app.UseCors("CorsPolicy");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
