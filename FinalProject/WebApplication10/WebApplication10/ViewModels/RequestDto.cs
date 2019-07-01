using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication10.ViewModels
{
    public class RequestDto
    {
       public RequestDto()
        {
            this.IsDeleted = false;
        }
        public int RequestID { get; set; }
        public string Location { get; set; }
        public string Destination { get; set; }
        public DateTime RequestTime { get; set; }
        public DateTime TripTime { get; set; }
        public string ShippingType { get; set; }
        public string carType { get; set; }
        public string ClientName { get; set; }
        public bool IsDeleted { get; set; }
    }
}