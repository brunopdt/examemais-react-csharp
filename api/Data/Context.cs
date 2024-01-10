using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> opts) : base(opts)
    {
        
    }

    public DbSet<PatientModel> Patients { get; set; }
    public DbSet<ClinicModel> Clinics { get; set; }
}

