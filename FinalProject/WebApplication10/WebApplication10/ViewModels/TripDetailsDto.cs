using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication10.ViewModels
{
    public class TripDetailsDto
    {
        public int RequestID { get; set; }
        public string Location { get; set; }
        public string Destination { get; set; }
        public DateTime RequestTime { get; set; }
        public DateTime TripTime { get; set; }
        public string ShippingType { get; set; }
        public string ClientName { get; set; }
        public string DriverName { get; set; }
        public float Bill { get; set; }
        public int clientRate { get; set; }
        public int DriverRate { get; set; }
        public string carType { get; set; }
        public string ClientID { get; set; }


        //public string ShippingType { get; set; }

    }
}