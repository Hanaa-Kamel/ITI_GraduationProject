using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication10.Models;

namespace WebApplication10
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            Database.SetInitializer<NqlaDB>(new DropCreateDatabaseIfModelChanges<NqlaDB>());


            //cors asma

            
              ////config.MapHttpAttributeRoutes();
              //// EnableCorsAttribute coreAttribute = new EnableCorsAttribute("*", "*", "*");
              //// config.EnableCors(coreAttribute);
               

            /**me*//*
            EnableCorsAttribute cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            */

            // Web API routes
            // config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "AdminApi",
            //    routeTemplate: "api/admin/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            //config.Routes.MapHttpRoute(
            //    name: "UserApi",
            //    routeTemplate: "api/user/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
