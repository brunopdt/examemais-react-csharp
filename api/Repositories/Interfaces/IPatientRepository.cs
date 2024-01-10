using api.Models;

namespace api.Repositories.Interfaces
{
    public interface IPatientRepository
    {
        Task RegisterNewPatient(PatientModel user);
    }
}
