using api.Data;
using api.Dtos.Request;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class LoginRepository : ILoginRepository
{
    private readonly Context _dbContext;

    public LoginRepository(Context dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<PatientModel?> FindPatientFromLoginRequest(LoginModel loginModel)
    {
        return _dbContext.Patients
            .FirstOrDefaultAsync(patient => patient.Email == loginModel.Email && patient.Password == loginModel.Password);
    }

}

