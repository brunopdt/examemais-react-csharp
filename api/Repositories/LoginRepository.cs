using api.Data;
using api.Models;
using api.Models.Interfaces;
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

    public Task<TModel?> FindFromLoginRequest<TModel>(LoginModel loginModel) where TModel : IUserModel
    {
        return _dbContext.Set<TModel>()
            .FirstOrDefaultAsync(model => model.Email == loginModel.Email && model.Password == loginModel.Password);
    }

    public async Task Update<TModel>(TModel model) where TModel : IUserModel
    {
        _dbContext.Update(model);
        await _dbContext.SaveChangesAsync();
    }


}

