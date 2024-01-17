using api.Data;
using api.Dtos.Request;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ClinicRepository : IClinicRepository
{
    private readonly Context _dbContext;

    public ClinicRepository(Context dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task RegisterNewClinic(ClinicModel clinic)
    {
        _dbContext.Clinics.Add(clinic);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<ClinicModel>> GetClinics()
    {
        return await _dbContext.Clinics.ToListAsync();
    }

}

