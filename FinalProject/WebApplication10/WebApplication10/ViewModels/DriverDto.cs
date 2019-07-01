using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication10.Models;

namespace WebApplication10.ViewModels
{
    public class DriverDto
    {
        public int ApplicantID { get; set; }


        
        public bool IsActive { get; set; }

        public int Rate { get; set; }

        public int numberOfTrips { get; set; }

        public double AvgRate { get; set; }



        public bool IsDeleted { get; set; }
    }
}