using api.Models;

namespace api.Repositories.Interfaces;

public interface ILoginRepository
{
    Task<PatientModel?> FindPatientFromLoginRequest(LoginModel loginModel);
    Task UpdatePatient(PatientModel patient);
}


