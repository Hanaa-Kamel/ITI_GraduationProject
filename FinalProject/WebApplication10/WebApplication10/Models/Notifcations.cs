using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class Notifcations
    {
        public Notifcations()
        {
            IsSeen = false;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int MassageID { get; set; }
        [ForeignKey("User")]
        public String UserID { get; set; }
        public IdentityUser User { get; set; }
        public string Messages { get; set; }
        public Boolean IsSeen { get; set; }




    }
}