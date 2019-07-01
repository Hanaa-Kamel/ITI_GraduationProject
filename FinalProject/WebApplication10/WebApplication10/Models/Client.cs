using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class Client
    {
        [Key]
        public string NationalID { get; set; }
        public string ClientName { get; set; }

         [ForeignKey("User")]
         public String UserID { get; set; }
        public int Rate { get; set; }
        public double AvgRate { get; set; }

        public int numbersOfRequest { get; set; }
        public IdentityUser User { get; set; }
        public List<Request> Requests { get; set; }
        //public DriverClientTrip DriverClientTrip { get; set; }

    }
}