using api.Data;
using api.Dtos.Request;
using api.Models;
using api.Repositories.Interfaces;

namespace api.Repositories;

public class PatientRepository : IPatientRepository
{
    private readonly Context _dbContext;

    public PatientRepository(Context dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task RegisterNewPatient(PatientModel patient)
    {
        _dbContext.Patients.Add(patient);
        await _dbContext.SaveChangesAsync();
    }
}

