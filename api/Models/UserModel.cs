using api.Enums;
using System.Security;

namespace api.Models;

public class UserModel
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Cpf { get; set; }
    public SecureString Password { get; set; }
    public UserTypeEnum UserTypeEnum { get; set; }
}

