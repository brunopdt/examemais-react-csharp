using System.ComponentModel.DataAnnotations;
using System.Security;

namespace api.Dtos.Request;

public class RegisterNewPatientRequestDTO
{
    [Required(ErrorMessage = "The full name field is mandatory")]
    public string FullName { get; set; }

    [Required(ErrorMessage = "The email field is mandatory")]
    public string Email { get; set; }

    [Required(ErrorMessage = "The CPF field is mandatory")]
    public string Cpf { get; set; }

    [Required(ErrorMessage = "The password field is mandatory")]
    public string Password { get; set; }
}

