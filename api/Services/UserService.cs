using api.Dtos.Request;
using api.Services.Interfaces;
using api.Repositories.Interfaces;
using api.Models;
using AutoMapper;

namespace api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task RegisterNewUser(RegisterNewUserRequestDTO user)
        {
            try
            {
                var userModel = _mapper.Map<RegisterNewUserRequestDTO, UserModel>(user);
                await _userRepository.RegisterNewUser(userModel);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao adicionar novo usuário: {ex.Message}");         
            }
        }
    }
}
