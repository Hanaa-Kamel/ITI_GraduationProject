using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class Trip
    {
        //[Key]
        //public int TripID { get; set; }
       // public int Duration { get; set; }
        [Key]
        [ForeignKey("Request")]
        public int RequestID { get; set; }
        public Request Request { get; set; }

        [ForeignKey("Driver")]
        public string NationalID { get; set; }
        public Driver Driver  { get; set; }


        public float Bill { get; set; }

        public int clientRate { get; set; }
        public int DriverRate { get; set; }
        [DefaultValue("false")]
        public bool ISDeleted { get; set; }
        //  public DriverClientTrip DriverClientTrip { get; set; }

    }
}