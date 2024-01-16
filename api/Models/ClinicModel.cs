using api.Models.Interfaces;
using System;

namespace api.Models
{
    public class ClinicModel : IUserModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Cnpj { get; set; }
    }
}
