using api.Models;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Private
{
    [Authorize]
    public class ClinicController : ControllerBase
    {
        private readonly IClinicService _clinicService;

        public ClinicController(IClinicService clinicService)
        {
            _clinicService = clinicService;
        }

        [HttpGet("/api/clinics")]
        public async Task<IActionResult> GetClinics()
        {
           IEnumerable<ClinicModel> clinics = await _clinicService.GetClinics();
           return Ok(clinics);
        }
    }
}
