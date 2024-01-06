using api.Dtos.Request;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class Auth : ControllerBase
{
    private readonly IUserService _userService;

    public Auth(IUserService userService)
    {
        _userService = userService;
    }

    //[HttpPost("login")]
    //public async Task<IActionResult> Login([FromBody] LoginRequestDTO user)
    //{
       
    //}
}
