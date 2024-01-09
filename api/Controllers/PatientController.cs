using api.Dtos.Request;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/patients")]
public class PatientController : ControllerBase
{
    private readonly IPatientService _patientService;

    public PatientController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterNewPatient([FromBody] RegisterNewPatientRequestDTO patient)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _patientService.RegisterNewPatient(patient);
            return CreatedAtAction(nameof(RegisterNewPatient), new { Message = "Paciente criado com sucesso" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = ex });
        }
    }

}
