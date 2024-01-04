using api.Dtos.Request;
using api.Services.Interfaces;
using api.Repositories.Interfaces;

namespace api.Services;

public class UserService : IUserService
{

    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }

    public async Task AddNewUser(AddUserRequestDTO user)
    {
        Console.WriteLine(user);
    }
}

