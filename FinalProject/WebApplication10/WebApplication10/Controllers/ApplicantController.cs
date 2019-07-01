using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication10.Models;
using WebApplication10.ViewModels;

namespace WebApplication10.Controllers
{
    public class ApplicantController : ApiController
    {
        NqlaDB context = new NqlaDB();

        [HttpPost]
        public IHttpActionResult postApplicant(/*ApplicantDto userdto*/)
        {

            var httpRequest = HttpContext.Current.Request;

            var Applicant = httpRequest["Applicant"];
            var newApplicant = Newtonsoft.Json.JsonConvert.DeserializeObject<NewApplicant>(Applicant);
            newApplicant.CopyLicenseImage = "";
            string imageName = null;

            var postedFile = httpRequest.Files["ImageFile"];
            if (postedFile != null)
            {

                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
                postedFile.SaveAs(filePath);
                newApplicant.CopyLicenseImage = "http://localhost:4700/Image/" + imageName;

            }


            newApplicant.CarColor = "red";
            newApplicant.Phone = "0123456789";
            if (ModelState.IsValid == false)
                return BadRequest();

            context.NewApplicants.Add(newApplicant);


            context.SaveChanges();
            return Ok();


            //Applicant applicant = new Applicant
            //{
            //    NationalID = userdto.NationalID,
            //    DriverName = userdto.DriverName,
            //    BirthDate = userdto.BirthDate,
            //    //personalcardImage = userdto.personalcardImage,
            //    CopyLicenseImage = userdto.CopyLicenseImage,
            //    //personalImage = userdto.personalImage,
            //    CarColor = userdto.CarColor,
            //    CarModel = userdto.CarModel,
            //    CarType = userdto.CarType
            //};
            //context.NewApplicants.Add(applicant);

            //context.SaveChanges();

        }





        //[HttpPost]
        //public IHttpActionResult PostApplicant(ApplicantDto userdto)
        //{

        //    //var httpRequest = HttpContext.Current.Request;

        //    //var Applicant = httpRequest["Applicant"];
        //    //var newApplicant = Newtonsoft.Json.JsonConvert.DeserializeObject<Applicant>(Applicant);
        //    //newApplicant.CopyLicenseImage = "";
        //    //string imageName = null;
        //    ////Upload Image
        //    //var postedFile = httpRequest.Files["ImageFile"];
        //    //if (postedFile != null)
        //    //{
        //    //    //Create custom filename
        //    //    imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
        //    //    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
        //    //    var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
        //    //    postedFile.SaveAs(filePath);
        //    //    newApplicant.CopyLicenseImage = "http://localhost:4700/Image/" + imageName;

        //    //}
        //    ////Save to DB


        //    ////if (ModelState.IsValid == false)
        //    ////    return BadRequest();

        //    //context.NewApplicants.Add(newApplicant);


        //    //context.SaveChanges();
        //    //return Ok();


        //    NewApplicant applicant = new NewApplicant
        //    {
        //        NationalID = userdto.NationalID,
        //        DriverName = userdto.DriverName,
        //        Age = userdto.Age,
        //        Email = userdto.Email,

        //        CopyLicenseImage = userdto.CopyLicenseImage,
        //        //personalImage = userdto.personalImage,
        //        CarColor = userdto.CarColor,
        //        CarModel = userdto.CarModel,
        //        CarType = userdto.CarType,
        //        Phone = userdto.Phone,
        //        Password=userdto.Password,
        //        ConfirmPass=userdto.ConfirmPass
        //    };
        //    context.NewApplicants.Add(applicant);

        //    context.SaveChanges();
        //    return Ok();

        //}
    }
}
