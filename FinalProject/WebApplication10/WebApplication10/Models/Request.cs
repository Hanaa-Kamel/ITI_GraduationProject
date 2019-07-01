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
    public class Request
    {

        Request()
        {

            status = RequestStatus.NotTaked;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestID { get; set; }
        public string Location { get; set; }
        public string Destination { get; set; }
        public DateTime RequestTime { get; set; }
        public DateTime TripTime { get; set; }
        public string ShippingType {get;set;}
        public string carType { get; set; }
   
        public RequestStatus status { get; set; }

        [ForeignKey("Client")]
        public string ClientID { get; set; }
        public Client Client { get; set; }

    }
}