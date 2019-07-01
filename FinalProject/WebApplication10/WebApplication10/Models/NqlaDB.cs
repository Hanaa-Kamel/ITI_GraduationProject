using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApplication10.Models
{
    public class NqlaDB:IdentityDbContext
    {

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // modelBuilder.Entity<DriverClientTrip>().HasKey(l => new { l.NationalIDClient, l.NationalIDDriver,l.TripID });
            // modelBuilder.Entity<DriverClientTrip>().HasKey(l => new { l.NationalIDClient, l.NationalIDDriver,l.TripID });

           // modelBuilder.Entity<Applicant>().Property(b => b.Status).HasDefaultValue();


        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<NewApplicant> NewApplicants { get; set; }

        public DbSet<Trip> Trips { get; set; }

        public DbSet<OnlineConnection> OnlineConnections { get; set; }
        public DbSet<Notifcations> Notifcations { get; set; }
        // public DbSet<DriverClientTrip> DriverClientTrips { get; set; }


    }
}