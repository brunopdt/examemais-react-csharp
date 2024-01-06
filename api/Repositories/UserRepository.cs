using api.Data;
using api.Dtos.Request;
using api.Models;
using api.Repositories.Interfaces;

namespace api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ClinicContext _dbContext;

    public UserRepository(ClinicContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task RegisterNewUser(UserModel user)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
    }
}

