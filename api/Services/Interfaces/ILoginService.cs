using api.Dtos.Request;
using api.Dtos.Response;
using api.Models;

namespace api.Services.Interfaces;

public interface ILoginService
{
    Task<LoginResponseDTO> Login(LoginRequestDTO loginRequest);
    LoginModel EncryptPassword(LoginRequestDTO user);
    string GenerateJwtToken(string userId, string email);
}
