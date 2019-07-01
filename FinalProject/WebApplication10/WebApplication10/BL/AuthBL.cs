using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication10.Models;
using WebApplication10.ViewModels;

namespace WebApplication10.BL
{
    public class AuthBL
    {
        UserManager<IdentityUser> manager;
        public AuthBL()
        {
            UserStore<IdentityUser> store = new UserStore<IdentityUser>(
                new NqlaDB());
            manager = new UserManager<IdentityUser>(store);
        }
        //Manager ==>identity
        //Find
        public IdentityUser Find(string name, string pass)
        {



            return manager.Find(name, pass);
        }
        //create
        public IdentityResult CreateDriver(ApplicantDto userdto)
        {
            IdentityUser identityUser = new IdentityUser();
            identityUser.UserName = userdto.Email;
            identityUser.Email = userdto.Email;


            IdentityResult identityResult= manager.Create(identityUser, userdto.Password);
            IdentityUser user = Find(userdto.Email, userdto.Password);
            return manager.AddToRole(user.Id, "Driver");




        }
        public IdentityResult CreateClient(ClientDto userdto)
        {
            IdentityUser identityUser = new IdentityUser();
            identityUser.UserName = userdto.Email;
            identityUser.Email = userdto.Email;


            manager.Create(identityUser, userdto.Password);
            IdentityUser user = Find(userdto.Email, userdto.Password);
            return manager.AddToRole(user.Id, "Client");

        }



        public IdentityResult CreateAdmin(AdminDto userdto)
        {
            IdentityUser identityUser = new IdentityUser();
            identityUser.UserName = userdto.Email;
            identityUser.Email = userdto.Email;


            manager.Create(identityUser, userdto.Password);
            IdentityUser user = Find(userdto.Email, userdto.Password);
            return manager.AddToRole(user.Id, "Admin");

        }
        public String getRole(IdentityUser user)
        {
            var roles = manager.GetRolesAsync(user.Id).Result;
            return roles[0];

        }
    }
}