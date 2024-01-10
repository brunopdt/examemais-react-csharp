using System.ComponentModel.DataAnnotations;
using System.Security;

namespace api.Dtos.Request;

public class RegisterNewClinicRequestDTO
{
    [Required(ErrorMessage = "The clinic's name field is mandatory")]
    public string Name { get; set; }

    [Required(ErrorMessage = "The address field is mandatory")]
    public string Address { get; set; }

    [Required(ErrorMessage = "The email field is mandatory")]
    public string Email { get; set; }

    [Required(ErrorMessage = "The CPF field is mandatory")]
    public string Cnpj { get; set; }

    [Required(ErrorMessage = "The password field is mandatory")]
    public string Password { get; set; }
}

