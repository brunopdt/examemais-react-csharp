using api.Dtos.Request;
using api.Models;

namespace api.Services.Interfaces;

public interface ILoginService
{
    Task<PatientModel> Login(LoginRequestDTO loginRequest);
    LoginModel EncryptPassword(LoginRequestDTO user);
    string GenerateJwtToken(string userId, string email);
}
