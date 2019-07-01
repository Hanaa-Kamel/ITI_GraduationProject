using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using WebApplication10.BL;

[assembly: OwinStartup(typeof(WebApplication10.Startup1))]

namespace WebApplication10
{
    public class Startup1
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR("/ChatHub", new HubConfiguration());

            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions()
            {
                TokenEndpointPath = new PathString("/token"),
                AllowInsecureHttp = true,
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(5),
                Provider = new MyProvider()
                //exp
                //token path
                //http
                //Provide
            });
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
           // app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
        }
    }

    internal class MyProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            //context.ClientId
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(
            OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            AuthBL repo = new AuthBL();
            IdentityUser user = repo.Find(context.UserName, context.Password);
            if (user == null)
            {
                context.SetError("Error User Pass Not valid");
            }
            ClaimsIdentity claims = new ClaimsIdentity(context.Options.AuthenticationType);
            claims.AddClaim(new Claim("Name", user.UserName));

            claims.AddClaim(new Claim(ClaimTypes.Role, repo.getRole(user)));
            //claims.AddClaim(new Claim(ClaimTypes.Role, "Admin"));
            //claims.AddClaim(new Claim(ClaimTypes.Role, "Driver"));
            //claims.AddClaim(new Claim(ClaimTypes.Role, "Client"));

            //claims.AddClaim(new Claim("Role", "Admin"));
            //claims.AddClaim(new Claim("Role", "User"));

            context.Validated(claims);
            //check user usin gLAyer
            //create toke
            //error
            //context.UserName;
            //context.Password
        }
    }
}
