using System.ComponentModel.DataAnnotations;
using System.Security;

namespace api.Dtos.Request;

public class LoginRequestDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
}

