using api.Dtos.Request;
using api.Dtos.Response;
using api.Models;
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
        PatientModel? patient = await FindPatient(loginModel);

        if (patient == null)
        {
            throw new UnauthorizedAccessException("Usuário não encontrado");
        }

        UpdatePatientTokens(patient);

        await UpdatePatientInDatabase(patient);


        return MapReturnPatientToResponseDTO(patient);
    }

    private LoginResponseDTO MapReturnPatientToResponseDTO(PatientModel patient)
    {
        return _mapper.Map<LoginResponseDTO>(patient);
    }

    private async Task<PatientModel?> FindPatient(LoginModel loginModel)
    {
        return await _loginRepository.FindPatientFromLoginRequest(loginModel);
    }

    private void UpdatePatientTokens(PatientModel patient)
    {
        if (patient.RefreshToken == null)
        {
            patient.RefreshToken = GenerateJwtToken(patient.Id.ToString(), patient.Email);
        }

        patient.AccessToken = GenerateJwtToken(patient.Id.ToString(), patient.Email);
    }

    private async Task UpdatePatientInDatabase(PatientModel patient)
    {
        await _loginRepository.UpdatePatient(patient);
    }

    public LoginModel EncryptPassword(LoginRequestDTO user)
    {
        var userWithEncryptedPassword = _mapper.Map<LoginRequestDTO, LoginModel>(user);
        return userWithEncryptedPassword;
    }

    public string GenerateJwtToken(string userId, string email)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, email)
            }),
            Expires = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"])),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

