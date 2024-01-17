using api.Dtos.Request;
using api.Models;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using AutoMapper;

namespace api.Services
{
    public class ClinicService : IClinicService
    {
        private readonly IClinicRepository _clinicRepository;
        private readonly IMapper _mapper;

        public ClinicService(IClinicRepository clinicRepository, IMapper mapper)
        {
            _mapper = mapper;
            _clinicRepository = clinicRepository;
        }

        public async Task RegisterNewClinic(RegisterNewClinicRequestDTO clinic)
        {
            ClinicModel clinicModel = _mapper.Map<RegisterNewClinicRequestDTO, ClinicModel>(clinic);
            await _clinicRepository.RegisterNewClinic(clinicModel);
        }

        public async Task<IEnumerable<ClinicModel>> GetClinics()
        {
            IEnumerable<ClinicModel> clinics = await _clinicRepository.GetClinics();
            return clinics;
        }
    }
}
