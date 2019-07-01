using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication10.BL;
using WebApplication10.Models;
using WebApplication10.ViewModels;

namespace WebApplication10.Areas.Admin
{
    [Authorize(Roles = "Driver")]
    public class DriverController : ApiController
    {


        NqlaDB context = new NqlaDB();




        [HttpGet]
        public IHttpActionResult AcceptRequest(int requestId, string Userid)
        {
            Request AcceptedRequest = context.Requests.Where(a => a.RequestID == requestId).FirstOrDefault();
            AcceptedRequest.status = RequestStatus.Taked;

            context.Entry(AcceptedRequest).State = EntityState.Modified;
            context.SaveChanges();
            string driver = context.Drivers.Where(a => a.UserID == Userid).FirstOrDefault().NationalID;


            if (ModelState.IsValid == false)
                return BadRequest();

            Trip trip = new Trip
            {
                RequestID = requestId,
                NationalID = driver,
                Bill = 0,
                clientRate = 0,
                DriverRate = 0,



            };

            context.Trips.Add(trip);
            //  context.DriverClientTrips.Add(driverClientTrip);
            context.SaveChanges();
            return Ok();





        }
        public IQueryable<TripDetailsDto> GetAllFinshedRequests(string userID/*,PagingParameterModel pagingparametermodel*/)
        {
            Driver driver = context.Drivers.Where(c => c.UserID == userID).FirstOrDefault();
            IQueryable<TripDetailsDto> AllRequests = context.Trips.Where(R => R.Bill > 0 && R.Driver.NationalID == driver.NationalID).Select(R => new TripDetailsDto
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
                TripTime = R.Request.TripTime,
                ClientID=R.NationalID
                
            });
            // 
       return GetRequests(AllRequests/*,pagingparametermodel*/);
        }
        //not finishedtrip
        public IQueryable<TripDetailsDto> GetAllNotFinshedRequests(string userID/*,[FromUri] PagingParameterModel pagingparametermodel*/)
        {

            Driver driver = context.Drivers.Where(c => c.UserID == userID).FirstOrDefault();
            IQueryable<TripDetailsDto> AllRequests = context.Trips.Where(R => R.Bill == 0 && R.Driver.NationalID == driver.NationalID).Select(R => new TripDetailsDto
            {
               
                RequestID =R.RequestID,
                Location = R.Request.Location,
                Destination = R.Request.Destination,
                RequestTime = R.Request.RequestTime,
                ShippingType = R.Request.ShippingType,
                DriverName = R.Driver.Applicant.DriverName,
                ClientName=R.Request.Client.ClientName,
                ClientID=R.NationalID
                

            });
            // 
       return GetRequests(AllRequests,null);
        }
        // not taked
        [HttpGet]
        public IQueryable<TripDetailsDto> GetAllNotTakedRequests(/*string userID,*/ /*PagingParameterModel pagingparametermodel=null*/)
        { 
           // Driver driver = context.Drivers.Where(c => c.UserID == userID).FirstOrDefault();

            IQueryable<TripDetailsDto> AllRequests = context.Requests.Where(R => R.status == RequestStatus.NotTaked /*&& R.carType == driver.Applicant.CarType*/).Select(R => new TripDetailsDto
            {
                RequestID = R.RequestID,
                Location = R.Location,
                Destination = R.Destination,
                RequestTime = R.RequestTime,
                ShippingType = R.ShippingType,
                carType = R.carType,
ClientID=R.ClientID


            });
            // 
       return GetRequests(AllRequests,null);
        }



        public IHttpActionResult CancelRequest(int TripID)
        {
            //Driver driver = context.Drivers.Where(c => c.UserID == userID).FirstOrDefault();

            Trip deletedTrip =
                context.Trips.Where(A => A.RequestID == TripID/*&&A.Driver.NationalID==driver.NationalID*/).
                FirstOrDefault();

            context.Entry(deletedTrip).State = EntityState.Deleted;
            context.SaveChanges();

            Request request = context.Requests.Where(A => A.RequestID == TripID).FirstOrDefault();
            request.status = RequestStatus.NotTaked;
                context.Entry(request).State = EntityState.Modified;
                context.SaveChanges();
                

         
            return Ok();
        }

        [HttpGet]

        public void PutRate(int requestid,int rate)
        {
            Trip trip = context.Trips.FirstOrDefault(r => r.RequestID == requestid);
            trip.clientRate = rate;
            context.Entry(trip).State = EntityState.Modified;
            context.SaveChanges();
            string clientID = context.Requests.FirstOrDefault(r => r.RequestID == requestid).ClientID;
            Client client = context.Clients.FirstOrDefault(R => R.NationalID == clientID);

           
            client.Rate += rate;
            client.AvgRate = client.Rate / client.numbersOfRequest;
            context.Entry(client).State = EntityState.Modified;
            context.SaveChanges();


        }
        private IQueryable<TripDetailsDto> GetRequests(IQueryable<TripDetailsDto> AllRequests, PagingParameterModel pagingparametermodel = null)

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

        public List<string> GetNotifcations(string userID)
        {
            return context.Notifcations.Where(r => r.UserID == userID && !r.IsSeen).Select(r => r.Messages).ToList();

        }
        [HttpGet]
        public int GetNotifcationsNumber(string userID)
        {
            return context.Notifcations.Where(r => r.UserID == userID && !r.IsSeen).Count();

        }

    }
}