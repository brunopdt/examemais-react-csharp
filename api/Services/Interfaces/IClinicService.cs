using api.Dtos.Request;
using api.Models;

namespace api.Services.Interfaces
{
    public interface IClinicService
    {
        Task RegisterNewClinic(RegisterNewClinicRequestDTO clinic);
        Task<IEnumerable<ClinicModel>> GetClinics();
    }
}
