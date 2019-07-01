using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication10.Models;

namespace WebApplication10.Hubs
{
    public class Connection
    {
        NqlaDB Nqla = new NqlaDB();

        public void AddConnection(string Connection, string UserID)
        {
         OnlineConnection online=   Nqla.OnlineConnections.FirstOrDefault(r => r.UserID == UserID);
            if (online == null)
            {
                Nqla.OnlineConnections.Add(new OnlineConnection { ConnectionID = Connection, UserID = UserID });
            }
            else
            {

                online.ConnectionID = Connection;
                Nqla.Entry(online).State = EntityState.Modified;


            }
            Nqla.SaveChanges();
        }
        public void RemoveConnection(string Connection)
        {
            OnlineConnection onlineConnection = Nqla.OnlineConnections.FirstOrDefault(r => r.ConnectionID == Connection);
            //Nqla.OnlineConnections.Remove(onlineConnection);
            //Nqla.SaveChanges();
            Nqla.Entry(onlineConnection).State = EntityState.Deleted;
            Nqla.SaveChanges();
        }

        public void send(string UserID, string message)
        {
            OnlineConnection onlineConnection = Nqla.OnlineConnections.FirstOrDefault(r => r.UserID == UserID);
            // if(on)
        }
    }
}