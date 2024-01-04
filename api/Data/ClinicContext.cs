using api.Repositories;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ClinicContext : DbContext
{
    public ClinicContext(DbContextOptions<ClinicContext> opts) : base(opts)
    {
        
    }

    public DbSet<UserRepository> Users { get; set; }
}

