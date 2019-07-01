using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication10.Areas.Admin;
using WebApplication10.Models;
using WebApplication10.ViewModels;

namespace WebApplication10.Hubs
{
    [HubName("ChatHub")]
    public class ChatHub : Hub
    {
        NqlaDB Nqla = new NqlaDB();


        Connection connection = new Connection();
        [HubMethodName("StratConnection")]
        public void StratConnection(string UserID)

        {
            //  Context
            connection.AddConnection(Context.ConnectionId, UserID);

            Client client = Nqla.Clients.FirstOrDefault(r => r.UserID == UserID);
            if(client !=null)
            {
                this.Groups.Add(this.Context.ConnectionId,"Clients");

            }
            else
            {
                this.Groups.Add(this.Context.ConnectionId, "Driver");

            }
        }
        [HubMethodName("Disconnect")]
        public void Disconnect()
        {

            connection.RemoveConnection(Context.ConnectionId);

        }
        [HubMethodName("SendNotifcation")]
        public void SendNotifcation(string userID, string Notifcation)
        {
            string id;
            

            Driver driver= Nqla.Drivers.FirstOrDefault(r => r.NationalID == userID);
            if(driver==null)
            {
              id=  Nqla.Clients.FirstOrDefault(r => r.NationalID == userID).UserID;
            }
            else

                id = Nqla.Drivers.FirstOrDefault(r => r.NationalID == userID).UserID;

            OnlineConnection connection = Nqla.OnlineConnections.FirstOrDefault(r => r.UserID == id);
           
            Nqla.Notifcations.Add(new Notifcations { UserID=id,Messages= Notifcation });
            Nqla.SaveChanges();
            if (connection != null)
            {
             int count=   Nqla.Notifcations.Where(r => r.UserID == id).Count();
                 Clients.Client(connection.ConnectionID).send(Notifcation,count);
                // Clients.All.send(count);
           //     DriverController driverController = new DriverController();
           //List<TripDetailsDto>  list=   driverController.GetAllNotTakedRequests().ToList();


            }
            Clients.Group("Driver").send();

        }

        public void SendNotifcationOneToOne(string userID, string Notifcation)
        {
            string id;


            Driver driver = Nqla.Drivers.FirstOrDefault(r => r.NationalID == userID);
            if (driver == null)
            {
                id = Nqla.Clients.FirstOrDefault(r => r.NationalID == userID).UserID;
            }
            else

                id = Nqla.Drivers.FirstOrDefault(r => r.NationalID == userID).UserID;

            OnlineConnection connection = Nqla.OnlineConnections.FirstOrDefault(r => r.UserID == id);

            Nqla.Notifcations.Add(new Notifcations { UserID = id, Messages = Notifcation });
            Nqla.SaveChanges();
            if (connection != null)
            {
                int count = Nqla.Notifcations.Where(r => r.UserID == id).Count();
                Clients.Client(connection.ConnectionID).send( count);
                

            }
          

        }
        public void SendNotifcationAllDriver()
        {

            Clients.Group("Driver").Refresh();


        }



    }
}