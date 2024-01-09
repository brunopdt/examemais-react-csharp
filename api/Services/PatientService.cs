using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Dtos.Request;
using api.Models;
using api.Repositories.Interfaces;
using api.Services.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public PatientService(IPatientRepository patientRepository, IMapper mapper, IConfiguration configuration)
        {
            _mapper = mapper;
            _patientRepository = patientRepository;
            _configuration = configuration;
        }

        public async Task RegisterNewPatient(RegisterNewPatientRequestDTO patient)
        {       
            var patientModel = _mapper.Map<RegisterNewPatientRequestDTO, PatientModel>(patient);
            await _patientRepository.RegisterNewPatient(patientModel);        
        }
    }
}
