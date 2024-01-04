using api.Dtos.Request;

namespace api.Services.Interfaces
{
    public interface IUserService
    {
        Task AddNewUser(AddUserRequestDTO user);
    }
}
