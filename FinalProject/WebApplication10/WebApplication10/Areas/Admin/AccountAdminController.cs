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

namespace WebApplication10.Areas.Admin
{
    public class AccountAdminController:ApiController
    {
        private AuthBL repos = new AuthBL();
        [HttpPost]
        public IDandToken Registration(AdminDto userdto)
        {
            if (ModelState.IsValid == false)
                return new IDandToken();


            IdentityResult result = repos.CreateAdmin(userdto);

            if (result.Succeeded)
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    Dictionary<string, string> tokenDetails = null;

                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri("http://localhost:4700/");
                    var login = new Dictionary<string, string>
        {
            {"grant_type", "password"},
            {"username", userdto.Email},
            {"password",userdto.Password},
        };
                    var response = client.PostAsync("Token", new FormUrlEncodedContent(login)).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        tokenDetails = JsonConvert.DeserializeObject<Dictionary<string, string>>(response.Content.ReadAsStringAsync().Result);
                        if (tokenDetails != null && tokenDetails.Any())
                        {
                            var tokenNo = tokenDetails.FirstOrDefault().Value;
                            IdentityUser user = repos.Find(userdto.Email, userdto.Password);
                            return new IDandToken
                            {
                                ID = user.Id,
                                Token = tokenDetails.FirstOrDefault().Value
                            };

                        }



                    }
                }


            }

            return new IDandToken();

        }


        [HttpPost]
       // [Route("api/admin/AccountAdmin")]
        public IDandToken Login(string name, string password)
        {
            if (ModelState.IsValid == false)
                return new IDandToken();


            IdentityUser result = repos.Find(name, password);

            if (result != null && repos.getRole(result).Contains("Admin"))
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    Dictionary<string, string> tokenDetails = null;

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