using api.Dtos.Request;
using api.Dtos.Response;
using api.Models;
using api.Models.Interfaces;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Services;

public class LoginService : ILoginService
{
    private readonly ILoginRepository _loginRepository;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public LoginService(ILoginRepository loginRepository, IMapper mapper, IConfiguration configuration)
    {
        _mapper = mapper;
        _loginRepository = loginRepository;
        _configuration = configuration;
    }

    public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequest)
    {
        LoginModel loginModel = EncryptPassword(loginRequest);
        IUserModel? user = await FindUser<PatientModel>(loginModel);

        if (user == null)
        {
            user = await FindUser<ClinicModel>(loginModel);
            
        }

        if (user == null)
        {
            throw new UnauthorizedAccessException("Usuário não encontrado");
        }
 

         UpdateUserTokens(user);
         await UpdateUserInDatabase(user);
         return MapReturnUserToResponseDTO(user);
    }

    private LoginResponseDTO MapReturnUserToResponseDTO<TModel>(TModel user) where TModel : IUserModel
    {
        return _mapper.Map<LoginResponseDTO>(user);
    }

    private async Task<TModel?> FindUser<TModel>(LoginModel loginModel) where TModel : IUserModel
    {
        return await _loginRepository.FindFromLoginRequest<TModel>(loginModel);
    }


    private void UpdateUserTokens<TModel>(TModel user) where TModel : IUserModel
    {
        if (user.RefreshToken == null)
        {
            user.RefreshToken = GenerateJwtToken(user.Id.ToString(), user.Email);
        }

        user.AccessToken = GenerateJwtToken(user.Id.ToString(), user.Email);
    }

    private async Task UpdateUserInDatabase<TModel>(TModel user) where TModel : IUserModel
    {
        await _loginRepository.Update(user);
    }

    public LoginModel EncryptPassword(LoginRequestDTO user)
    {
        var userWithEncryptedPassword = _mapper.Map<LoginRequestDTO, LoginModel>(user);
        return userWithEncryptedPassword;
    }

    public string GenerateJwtToken(string userId, string email)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var Sectoken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
          _configuration["Jwt:Issuer"],
          null,
          expires: DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"])),
          signingCredentials: credentials);

        var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

        return token;
    }
}

