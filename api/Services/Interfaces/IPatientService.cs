using api.Dtos.Request;

namespace api.Services.Interfaces
{
    public interface IClinicService
    {
        Task RegisterNewClinic(RegisterNewClinicRequestDTO clinic);
    }
}
