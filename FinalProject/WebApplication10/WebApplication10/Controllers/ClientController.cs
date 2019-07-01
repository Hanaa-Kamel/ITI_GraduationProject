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

namespace WebApplication10.Controllers
{
    [Authorize(Roles = "Client")]
    public class ClientController : ApiController
    {
        NqlaDB context = new NqlaDB();

        [HttpPost]
        public IHttpActionResult PostRequest([FromBody]Request request,[FromUri]string userid)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Client client = context.Clients.Where(c => c.UserID == userid) .FirstOrDefault();
            request.Client = client;
            request.RequestTime = DateTime.Now;
            request.TripTime = DateTime.Now;
            context.Requests.Add(request);

            
                context.SaveChanges();
                return Ok();
           
        }
        //task finish 
        public IQueryable<TripDetailsDto> GetAllFinshedRequests(string userID/*, [FromUri]PagingParameterModel pagingparametermodel*/)
        {
            Client client = context.Clients.Where(c => c.UserID == userID).FirstOrDefault();
            IQueryable<TripDetailsDto> AllRequests = context.Trips.Where(R => R.Bill > 0 && R.Request.Client.NationalID == client.NationalID).Select(R => new TripDetailsDto
            {
                RequestID = R.RequestID,
                Location = R.Request.Location,
                Destination = R.Request.Destination,
                RequestTime = R.Request.RequestTime,
                ShippingType = R.Request.ShippingType,
                DriverName = R.Driver.Applicant.DriverName,
                Bill = R.Bill,
                clientRate = R.clientRate,
                DriverRate = R.DriverRate,
                TripTime = R.Request.TripTime
            });
            // 
            return GetRequests(AllRequests/*, pagingparametermodel*/);
        }
//not finishedtrip
        public IQueryable<TripDetailsDto> GetAllNotFinshedRequests(string userID/*, [FromUri]PagingParameterModel pagingparametermodel*/)
        {

            Client client = context.Clients.Where(c => c.UserID == userID).FirstOrDefault();

            IQueryable<TripDetailsDto> AllRequests = context.Trips.Where(R => R.Bill == 0 && R.Request.Client.NationalID == client.NationalID).Select(R => new TripDetailsDto
            {
                RequestID = R.RequestID,
                Location = R.Request.Location,
                Destination = R.Request.Destination,
                RequestTime = R.Request.RequestTime,
                ShippingType = R.Request.ShippingType,
                DriverName = R.Driver.Applicant.DriverName,


            });
            // 
               return GetRequests(AllRequests/*, pagingparametermodel*/);
        }
        // not taked
        public IQueryable<TripDetailsDto> GetAllNotTakedRequests(string userID/*, [FromUri]PagingParameterModel pagingparametermodel */)
        {
            Client client = context.Clients.Where(c => c.UserID == userID).FirstOrDefault();

            IQueryable<TripDetailsDto> AllRequests = context.Requests.Where(R => R.status== RequestStatus.NotTaked && R.Client.NationalID == client.NationalID).Select(R => new TripDetailsDto
            {
                RequestID=R.RequestID,
                Location = R.Location,
                Destination = R.Destination,
                RequestTime = R.RequestTime,
                ShippingType = R.ShippingType,
                carType=R.carType,
            ClientName=R.Client.ClientName


            });
            return GetRequests(AllRequests/*,pagingparametermodel*/);
           
        }

        [HttpDelete]

        public IHttpActionResult CancelRequest(int RequestID)
        {

            Request deletedRequested= context.Requests.Where(A => A.RequestID == RequestID).FirstOrDefault();

            if (deletedRequested.status == RequestStatus.Taked)
            {
       Trip trip= context.Trips.Where(A =>A.RequestID== RequestID).FirstOrDefault();
                context.Entry(trip).State = EntityState.Deleted;
                context.SaveChanges();
            }

            deletedRequested.status = RequestStatus.Cancelled;
                context.Entry(deletedRequested).State = EntityState.Modified;
            

           
                context.SaveChanges();
            

            return Ok();
        }
        [HttpGet]

        public IHttpActionResult PayBill(int TripID,float Bill,int Rate)
        {
           

            Trip PaidTrip = context.Trips.Where(A => A.RequestID == TripID).FirstOrDefault();
            

            PaidTrip.Bill = Bill;
            PaidTrip.DriverRate = Rate;
                context.Entry(PaidTrip).State = EntityState.Modified;
                context.SaveChanges();
         string clientID=   context.Requests.FirstOrDefault(r => r.RequestID == TripID).ClientID;

            Client client = context.Clients.FirstOrDefault(R => R.NationalID == clientID);
            client.numbersOfRequest += 1;
            context.Entry(client).State = EntityState.Modified;
            context.SaveChanges();

            Driver driver = context.Drivers.FirstOrDefault(R => R.NationalID == PaidTrip.NationalID);
            driver.Rate += Rate;
            driver.numberOfTrips += 1;
            driver.AvgRate = driver.Rate / driver.numberOfTrips;

            context.Entry(driver).State = EntityState.Modified;
            context.SaveChanges();



            return Ok();
        }






        private IQueryable<TripDetailsDto> GetRequests( IQueryable<TripDetailsDto> AllRequests, PagingParameterModel pagingparametermodel = null)

        {    
            if (pagingparametermodel != null)
            {
                pagingparametermodel.ConfigurePagingParameter(AllRequests.Count());

                // Returns IQueryable of Customer after applying Paging   
                AllRequests = AllRequests.OrderBy(o => o.RequestID).Skip((pagingparametermodel.pageNumber - 1) * pagingparametermodel.PageSize).Take(pagingparametermodel.PageSize);
            }
            // 
            return AllRequests;
        }
        [HttpGet]

        public int GetNotifcationsNumber(string userID)
        {
            return context.Notifcations.Where(r => r.UserID == userID && !r.IsSeen).Count();

        }

        [HttpGet]

        public List<string> GetNotifcations(string userID)
        {
            return context.Notifcations.Where(r => r.UserID == userID && !r.IsSeen).Select(r => r.Messages).ToList();
            
        }
    }
}
