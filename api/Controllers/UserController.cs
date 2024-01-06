using api.Dtos.Request;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterNewUser([FromBody] RegisterNewUserRequestDTO user)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _userService.RegisterNewUser(user);
            return Ok("Usuário criado com sucesso");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Ocorreu um erro ao processar a solicitação.");
        }
    }

}
