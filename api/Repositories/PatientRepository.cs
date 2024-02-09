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
        if (IsEmailAlreadyRegistered(patient.Email))
        {
            throw new Exception("Email já registrado.");
        }
        if (IsCpfAlreadyRegistered(patient.Cpf))
        {
            throw new Exception("Cpf já registrado.");
        }

        _dbContext.Patients.Add(patient);
        await _dbContext.SaveChangesAsync();
    }

    private bool IsEmailAlreadyRegistered(string email)
    {
        bool isPatientRegistered = _dbContext.Patients.Any(x => x.Email == email);
        bool isClinicRegistered = _dbContext.Clinics.Any(x => x.Email == email);

        return isPatientRegistered || isClinicRegistered;
    }
    private bool IsCpfAlreadyRegistered(string cpf)
    {
        return _dbContext.Patients.Any(x => x.Cpf == cpf);
    }

}

