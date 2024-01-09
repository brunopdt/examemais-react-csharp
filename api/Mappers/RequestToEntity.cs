using System;
using AutoMapper;
using api.Dtos.Request;
using api.Models;

public class RequestToEntity : Profile
{
    public RequestToEntity()
    {
        CreateMap<RegisterNewPatientRequestDTO, PatientModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
            .ForMember(dest => dest.Password, opt => opt.MapFrom(src => EncryptPassword(src.Password)));

        CreateMap<LoginRequestDTO, LoginModel>()
            .ForMember(dest => dest.Password, opt => opt.MapFrom(src => EncryptPassword(src.Password)));
    }

    private string EncryptPassword(string password)
    {
        using (var sha256 = System.Security.Cryptography.SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }
    }
}
