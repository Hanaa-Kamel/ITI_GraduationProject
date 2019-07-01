using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication10.ViewModels
{
    public class ClientDto
    {
        [Required]
        public string NationalID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Compare("Password")]
        public string ConfirmPass { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}