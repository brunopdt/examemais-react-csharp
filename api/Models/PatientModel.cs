using api.Models.Interfaces;
using System;

namespace api.Models
{
    public class PatientModel : IUserModel
    {
        public string FullName { get; set; }
        public string Cpf { get; set; }
    }
}
