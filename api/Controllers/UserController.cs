using api.Dtos.Request;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("AddUser")]
    public async Task<IActionResult> AddUser([FromBody] AddUserRequestDTO user)
    {
       await _userService.AddNewUser(user);
        return Ok();
    }
}
