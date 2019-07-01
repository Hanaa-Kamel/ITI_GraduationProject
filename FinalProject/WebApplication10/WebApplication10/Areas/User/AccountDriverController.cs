using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApplication10.BL;
using WebApplication10.ViewModels;
using System.Net.Http;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApplication10.Models;


using WebApplication10.Controllers;
using System.Data.Entity;
using WebApplication10.Areas.Admin;

namespace WebApplication10.Areas.User
{
    public class AccountDriverController : ApiController
    {
        private AuthBL repos = new AuthBL();
        NqlaDB context = new NqlaDB();
       // [HttpPost]
       // public IDandToken Registration(ApplicantDto userdto)
       // {
       //     if (ModelState.IsValid == false)
       //         return new IDandToken();



       //     IdentityResult result = repos.CreateDriver(userdto);

       //     if (result.Succeeded)
       //     {
       //         using (HttpClient httpClient = new HttpClient())
       //         {
       //             Dictionary<string, string> tokenDetails = null;

       //             HttpClient client = new HttpClient();
       //             client.BaseAddress = new Uri("http://localhost:4700/");
       //             var login = new Dictionary<string, string>
       //{
       //    {"grant_type", "password"},
       //    {"username", userdto.DriverName},
       //    {"password",userdto.Password},
       //};
       //             var response = client.PostAsync("Token", new FormUrlEncodedContent(login)).Result;
       //             if (response.IsSuccessStatusCode)
       //             {

       //                 tokenDetails = JsonConvert.DeserializeObject<Dictionary<string, string>>(response.Content.ReadAsStringAsync().Result);
       //                 if (tokenDetails != null && tokenDetails.Any())
       //                 {
       //                     var tokenNo = tokenDetails.FirstOrDefault().Value;
       //                     IdentityUser user = repos.Find(userdto.DriverName, userdto.Password);

       //                     AdminController applicantobj = new AdminController();
       //                     Applicant applicant = applicantobj.getApplicant(userdto.NationalID);
       //                     Driver driver = new Driver
       //                     {
       //                         UserID = user.Id,
       //                         NationalID = applicant.NationalID,
       //                         Rate = 0,
       //                         numberOfTrips = 0,
       //                         AvgRate=0.0,

                            


       //                      };
       //                     applicant.Status = NewApplicantstatus.Accepted;
       //                     context.Entry(applicant).State = EntityState.Modified;
       //                     context.SaveChanges();
                            
       //                     context.Drivers.Add(driver);
       //                     context.SaveChanges();
       //                     return new IDandToken { ID = user.Id, Token = tokenDetails.FirstOrDefault().Value };


       //                 }





       //             }



       //         }
       //     }

       //         return new IDandToken();

       //     }

        
        [HttpGet]

        public IDandToken Login(string name, string password)
        {
            if (ModelState.IsValid == false)
                return new IDandToken();



            IdentityUser result = repos.Find(name, password);

            if (result != null && repos.getRole(result).Contains("Driver"))
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    Dictionary<string, string> tokenDetails = null;
                    // var messageDetails = new Message { Id = 4, Message1 = des };
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri("http://localhost:4700/");
                    var login = new Dictionary<string, string>
       {
           {"grant_type", "password"},
           {"username", name},
           {"password",password},
       };
                    var response = client.PostAsync("Token", new FormUrlEncodedContent(login)).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        tokenDetails = JsonConvert.DeserializeObject<Dictionary<string, string>>(response.Content.ReadAsStringAsync().Result);
                        if (tokenDetails != null && tokenDetails.Any())
                        {
                            var tokenNo = tokenDetails.FirstOrDefault().Value;
                            
                            return new IDandToken { ID = result.Id, Token = tokenDetails.FirstOrDefault().Value };

                        }



                    }
                }


            }
            return new IDandToken();

        }
    }
}