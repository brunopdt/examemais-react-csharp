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
        if (IsEmailAlreadyRegistered(clinic.Email))
        {
            throw new Exception("Email já registrado.");
        }

        if (IsCnpjAlreadyRegistered(clinic.Cnpj))
        {
            throw new Exception("Cnpj já registrado.");
        }

        _dbContext.Clinics.Add(clinic);
        await _dbContext.SaveChangesAsync();
    }

    private bool IsEmailAlreadyRegistered(string email)
    {
        bool isPatientRegistered = _dbContext.Patients.Any(x => x.Email == email);
        bool isClinicRegistered = _dbContext.Clinics.Any(x => x.Email == email);

        return isPatientRegistered || isClinicRegistered;
    }

    private bool IsCnpjAlreadyRegistered(string cnpj)
    {
        return _dbContext.Clinics.Any(x => x.Cnpj == cnpj);
    }

    public async Task<IEnumerable<ClinicModel>> GetClinics()
    {
        return await _dbContext.Clinics.ToListAsync();
    }

}

