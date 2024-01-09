using api.Dtos.Request;
using api.Services;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class Auth : ControllerBase
{
    private readonly ILoginService _loginService;

    public Auth(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO user)
    {
        await _loginService.Login(user);
        return Ok("Paciente criado com sucesso");
    }
}
