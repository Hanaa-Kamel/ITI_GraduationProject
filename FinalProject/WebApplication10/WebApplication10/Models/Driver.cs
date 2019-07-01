using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class Driver
    {
        [Key]
        [ForeignKey("Applicant")]
        public string NationalID { get; set; }

        public NewApplicant Applicant { get; set; }

        [DefaultValue("true")]
        public bool IsActive { get; set; }

        public int  Rate  { get; set; }

        public int numberOfTrips { get; set; }

        public double AvgRate { get; set; }
     
        [ForeignKey("User")]
        public String UserID { get; set; }

        public IdentityUser User { get; set; }

        [DefaultValue("false")]
        public bool IsDeleted { get; set; }
        // public virtual DriverClientTrip DriverClientTrip { get; set; }
    }
}