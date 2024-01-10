using api.Dtos.Request;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/clinics")]
public class ClinicController : ControllerBase
{
    private readonly IClinicService _clinicService;

    public ClinicController(IClinicService clinicService)
    {
        _clinicService = clinicService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterNewClinic([FromBody] RegisterNewClinicRequestDTO clinic)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _clinicService.RegisterNewClinic(clinic);
            return CreatedAtAction(nameof(RegisterNewClinic), new { Message = "Clínica registrada com sucesso" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = ex });
        }
    }

}
