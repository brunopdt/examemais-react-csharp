using api.Dtos.Request;

namespace api.Services.Interfaces
{
    public interface IPatientService
    {
        Task RegisterNewPatient(RegisterNewPatientRequestDTO user);
    }
}
