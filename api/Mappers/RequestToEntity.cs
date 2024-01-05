using api.Dtos.Request;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Rendering;

public class RequestToEntity : Profile
{
    public RequestToEntity()
    {
        CreateMap<AddUserRequestDTO, UserModel>()
        .ForMember(atribute => atribute.Id, map => map.MapFrom(src => new Guid()));
    }
}
