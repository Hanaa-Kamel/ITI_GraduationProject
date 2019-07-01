using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication10.BL;
using WebApplication10.Models;
using WebApplication10.ViewModels;

namespace WebApplication10.Areas.Admin
{
   [Authorize(Roles = "Admin")]
    public class AdminController : ApiController
    {

        NqlaDB context = new NqlaDB();
        public IQueryable<ApplicantDto> GetAllApplicant([FromUri]PagingParameterModel pagingparametermodel)
        {


            IQueryable<ApplicantDto> AllApplicant = context.NewApplicants.Where(A => A.Status == BL.NewApplicantstatus.Notseen)
                .Select(A => new ApplicantDto
                {

                    NationalID = A.NationalID,
                    DriverName = A.DriverName,
                    Age = A.Age,
                    CarModel = A.CarModel,
                    CarColor = A.CarColor,
                    CarType = A.CarType,
                    Status = A.Status,
                    CopyLicenseImage = A.CopyLicenseImage
                });
            // 
            return GetNewNewApplicants(AllApplicant, pagingparametermodel);
        }



        public IQueryable<ApplicantDto> GetAllDrivers([FromUri]PagingParameterModel pagingparametermodel)
        {


            IQueryable<ApplicantDto> AllApplicant = context.NewApplicants.Where(A => A.Status == BL.NewApplicantstatus.Accepted)
                .Select(A => new ApplicantDto
                {
                    //    ID = A.ID,
                    NationalID = A.NationalID,
                    DriverName = A.DriverName,
                    Age = A.Age,
                    CarModel = A.CarModel,
                    CarColor = A.CarColor,
                    CarType = A.CarType,
                    Status = A.Status,
                    CopyLicenseImage = A.CopyLicenseImage
                });
            // 
            return GetNewNewApplicants(AllApplicant, pagingparametermodel);
        }


        //[HttpPost]
        //public IHttpActionResult postApplicant(ApplicantDto userdto)
        //{
        //    if (ModelState.IsValid == false)
        //        return BadRequest();

        //    Applicant applicant = new Applicant
        //    {
        //        NationalID = userdto.NationalID,
        //        DriverName = userdto.DriverName,
        //        Age = userdto.Age,
        //        Password = userdto.Password,
        //        ConfirmPass = userdto.ConfirmPass,

        //        Email = userdto.Email,
        //        //personalcardImage = userdto.personalcardImage,
        //        CopyLicenseImage = userdto.CopyLicenseImage,
        //        //personalImage = userdto.personalImage,
        //        CarColor = userdto.CarColor,
        //        CarModel = userdto.CarModel,
        //        CarType = userdto.CarType
        //    };
        //    context.NewApplicants.Add(applicant);
        //    context.SaveChanges();
        //    return Ok();
        //}



        public IHttpActionResult DeleteApplicant(string id)
        {
            NewApplicant deletedApplicant = context.NewApplicants.Where(A => A.NationalID == id && A.Status == BL.NewApplicantstatus.Notseen).FirstOrDefault();



            if (deletedApplicant == null)
            {
                return NotFound();
            }

            context.Entry(deletedApplicant).State = EntityState.Deleted;

            try
            {

                context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if ((bool)!ApplicantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(deletedApplicant);
        }




        public IHttpActionResult DeleteDriver(string id)
        {
            Driver deletedDriver = context.Drivers.Where(A => A.NationalID == id).FirstOrDefault();

            deletedDriver.IsDeleted = true;

            if (deletedDriver == null)
            {
                return NotFound();
            }

            context.Entry(deletedDriver).State = EntityState.Modified;

            try
            {

                context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if ((bool)!ApplicantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(deletedDriver);
        }






        private bool? ApplicantExists(string id)
        {
            return context.NewApplicants.Count(e => e.NationalID == id) > 0;
        }






        [HttpGet]
        public NewApplicant getApplicant(string NationalId)
        {
            if (ModelState.IsValid == false)
                return null;

            NewApplicant applicant = context.NewApplicants.Where(w => w.NationalID == NationalId).FirstOrDefault();
            return applicant;
        }






        [HttpGet]
        public Driver getDriver(string NationalId)
        {
            if (ModelState.IsValid == false)
                return null;

            NewApplicant applicant = context.NewApplicants.Where(w => w.NationalID == NationalId).FirstOrDefault();
            Driver driver = context.Drivers.Where(d => d.NationalID == applicant.NationalID).FirstOrDefault();
            DriverDto getdriver = new DriverDto()
            {
                Rate = driver.Rate,
                AvgRate = driver.AvgRate,
                numberOfTrips = driver.numberOfTrips,
            };
            return driver;
        }
        [HttpPost]
        public IHttpActionResult RegistrationDriver(ApplicantDto userdto)
        {
            AuthBL repos = new AuthBL();
            if (ModelState.IsValid == false)
                return BadRequest();



            IdentityResult result = repos.CreateDriver(userdto);

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

                            AdminController applicantobj = new AdminController();
                            NewApplicant applicant = applicantobj.getApplicant(userdto.NationalID);
                            Driver driver = new Driver
                            {
                                UserID = user.Id,
                                NationalID = applicant.NationalID,
                                Rate = 0,
                                numberOfTrips = 0,
                                AvgRate = 0.0,




                            };
                            applicant.Status = NewApplicantstatus.Accepted;
                            context.Entry(applicant).State = EntityState.Modified;
                            context.SaveChanges();

                            context.Drivers.Add(driver);
                            context.SaveChanges();
                            return Ok();


                        }





                    }



                }
            }

            return BadRequest();

        }





        private IQueryable<ApplicantDto> GetNewNewApplicants(IQueryable<ApplicantDto> NewApplicants, PagingParameterModel pagingparametermodel = null)

        {
            if (pagingparametermodel != null)
            {
                pagingparametermodel.ConfigurePagingParameter(NewApplicants.Count());

                // Returns IQueryable of Customer after applying Paging   
                NewApplicants = NewApplicants.OrderBy(o => o.NationalID).Skip((pagingparametermodel.pageNumber - 1) * pagingparametermodel.PageSize).Take(pagingparametermodel.PageSize);
            }
            // 
            return NewApplicants;
        }




    }
}