using api.Models;
using api.Models.Interfaces;

namespace api.Repositories.Interfaces;

public interface ILoginRepository
{
    Task<TModel?> FindFromLoginRequest<TModel>(LoginModel loginModel) where TModel : IUserModel;
    Task Update<TModel>(TModel model) where TModel : IUserModel;
}