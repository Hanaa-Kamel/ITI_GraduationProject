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

namespace WebApplication10.Areas.User
{
    public class AccountClientController: ApiController
    {
        private AuthBL repos = new AuthBL();
        NqlaDB context = new NqlaDB();
        [HttpPost]
        public IDandToken Registration(ClientDto userdto)
        {
            if (ModelState.IsValid == false)
                return new IDandToken();
           

            IdentityResult result = repos.CreateClient(userdto);

            if (result.Succeeded)
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
                            Client newclient = new Client
                            {
                                NationalID = userdto.NationalID,
                                ClientName = userdto.Name,
                                UserID=user.Id
                            };

                            context.Clients.Add(newclient);
                            context.SaveChanges();

                            return new IDandToken { ID = user.Id, Token = tokenDetails.FirstOrDefault().Value };

                        }



                    }
                }


            }

            return new IDandToken();

        }

        [HttpGet]

        public IDandToken Login(string name, string password)
        {
            if (ModelState.IsValid == false)
                return new IDandToken();



            IdentityUser result = repos.Find(name, password);

            if (result != null && repos.getRole(result).Contains("Client"))
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
                            ////client.DefaultRequestHeaders.Add("Authorization", "Bearer " + tokenNo);
                            ////client.PostAsJsonAsync("api/token", login)
                            ////    .ContinueWith((postTask) => postTask.Result.EnsureSuccessStatusCode());
                            //System.Web.HttpContext.Current.Session["BearerToken"] = tokenNo;
                            //return Created("", tokenNo);
                            return new IDandToken { ID = result.Id, Token = tokenDetails.FirstOrDefault().Value };

                        }



                    }
                }


            }
            return new IDandToken();

        }
    }
}