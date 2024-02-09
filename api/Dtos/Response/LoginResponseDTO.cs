namespace api.Dtos.Response;
public class LoginResponseDTO
{
    public Guid Id { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
    public string Profile { get; set; }
}

