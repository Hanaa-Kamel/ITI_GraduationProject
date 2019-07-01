using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebApplication10.BL;

namespace WebApplication10.ViewModels
{
    public class ApplicantDto
    {
       // public int ID { get; set; }
        [Required]
        public string NationalID { get; set; }

     [Required]
        public string DriverName { get; set; }

        [Required]
        public int Age { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Compare("Password")]
        public string ConfirmPass { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string CarModel { get; set; }
        [Required]
        public string CarColor { get; set; }
        [Required]
        public string CarType { get; set; }
        
        public string CopyLicenseImage { get; set; }
      
        //public string personalcardImage { get; set; }
        
        //public string personalImage { get; set; }

        public NewApplicantstatus Status { get; set; }
        //public bool? IsDeleted { get; set; }
        [Required]
        public string Phone { get; set; }


    }
}