using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebApplication10.BL;

namespace WebApplication10.Models
{
    public class NewApplicant
    {
      

        [Key]
       // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
       // public int ID { get; set; }
        public string NationalID { get; set; }
        public string DriverName { get; set; }
        public int Age { get; set; }

        public string Password { get; set; }
       
        public string ConfirmPass { get; set; }
      
        public string Email { get; set; }
        public string CopyLicenseImage { get; set; }
        //public string personalcardImage { get; set; }
        //public string personalImage { get; set; }
        public string CarModel { get; set; }
        public string CarColor { get; set; }
        public string CarType { get; set; }
        //[DefaultValue("false")]
        //public bool IsDeleted { get; set; }


        public string Phone { get; set; }


        public NewApplicantstatus Status { get; set; }/*=NewApplicantstatus.Notseen;*/

        public NewApplicant()
        {
            Status = NewApplicantstatus.Notseen;
        }

    }
}