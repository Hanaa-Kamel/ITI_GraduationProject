using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class OnlineConnection
    {
        [Key]
        [ForeignKey("User")]
        public String UserID { get; set; }
        public IdentityUser User { get; set; }


        public string ConnectionID { get; set; }
    }
}