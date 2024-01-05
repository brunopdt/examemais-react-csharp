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

        public async Task AddNewUser(AddUserRequestDTO user)
        {
            try
            {
                var userModel = _mapper.Map<AddUserRequestDTO, UserModel>(user);
                await _userRepository.AddNewUser(userModel);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao adicionar novo usuário: {ex.Message}");         
            }
        }
    }
}
