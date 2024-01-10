using api.Models;

namespace api.Repositories.Interfaces
{
    public interface IClinicRepository
    {
        Task RegisterNewClinic(ClinicModel clinic);
    }
}
