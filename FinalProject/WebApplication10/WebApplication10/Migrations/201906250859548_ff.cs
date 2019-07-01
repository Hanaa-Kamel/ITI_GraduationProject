namespace WebApplication10.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ff : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        NationalID = c.String(nullable: false, maxLength: 128),
                        ClientName = c.String(),
                        UserID = c.String(maxLength: 128),
                        Rate = c.Int(nullable: false),
                        AvgRate = c.Double(nullable: false),
                        numbersOfRequest = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.NationalID)
                .ForeignKey("dbo.AspNetUsers", t => t.UserID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.Requests",
                c => new
                    {
                        RequestID = c.Int(nullable: false, identity: true),
                        Location = c.String(),
                        Destination = c.String(),
                        RequestTime = c.DateTime(nullable: false),
                        TripTime = c.DateTime(nullable: false),
                        ShippingType = c.String(),
                        carType = c.String(),
                        status = c.Int(nullable: false),
                        ClientID = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.RequestID)
                .ForeignKey("dbo.Clients", t => t.ClientID)
                .Index(t => t.ClientID);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Drivers",
                c => new
                    {
                        NationalID = c.String(nullable: false, maxLength: 128),
                        IsActive = c.Boolean(nullable: false),
                        Rate = c.Int(nullable: false),
                        numberOfTrips = c.Int(nullable: false),
                        AvgRate = c.Double(nullable: false),
                        UserID = c.String(maxLength: 128),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.NationalID)
                .ForeignKey("dbo.NewApplicants", t => t.NationalID)
                .ForeignKey("dbo.AspNetUsers", t => t.UserID)
                .Index(t => t.NationalID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.NewApplicants",
                c => new
                    {
                        NationalID = c.String(nullable: false, maxLength: 128),
                        DriverName = c.String(),
                        Age = c.Int(nullable: false),
                        Password = c.String(),
                        ConfirmPass = c.String(),
                        Email = c.String(),
                        CopyLicenseImage = c.String(),
                        CarModel = c.String(),
                        CarColor = c.String(),
                        CarType = c.String(),
                        Phone = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.NationalID);
            
            CreateTable(
                "dbo.Notifcations",
                c => new
                    {
                        MassageID = c.Int(nullable: false, identity: true),
                        UserID = c.String(maxLength: 128),
                        Messages = c.String(),
                        IsSeen = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.MassageID)
                .ForeignKey("dbo.AspNetUsers", t => t.UserID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.OnlineConnections",
                c => new
                    {
                        UserID = c.String(nullable: false, maxLength: 128),
                        ConnectionID = c.String(),
                    })
                .PrimaryKey(t => t.UserID)
                .ForeignKey("dbo.AspNetUsers", t => t.UserID)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.Trips",
                c => new
                    {
                        RequestID = c.Int(nullable: false),
                        NationalID = c.String(maxLength: 128),
                        Bill = c.Single(nullable: false),
                        clientRate = c.Int(nullable: false),
                        DriverRate = c.Int(nullable: false),
                        ISDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.RequestID)
                .ForeignKey("dbo.Drivers", t => t.NationalID)
                .ForeignKey("dbo.Requests", t => t.RequestID)
                .Index(t => t.RequestID)
                .Index(t => t.NationalID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Trips", "RequestID", "dbo.Requests");
            DropForeignKey("dbo.Trips", "NationalID", "dbo.Drivers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.OnlineConnections", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.Notifcations", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.Drivers", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.Drivers", "NationalID", "dbo.NewApplicants");
            DropForeignKey("dbo.Clients", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Requests", "ClientID", "dbo.Clients");
            DropIndex("dbo.Trips", new[] { "NationalID" });
            DropIndex("dbo.Trips", new[] { "RequestID" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.OnlineConnections", new[] { "UserID" });
            DropIndex("dbo.Notifcations", new[] { "UserID" });
            DropIndex("dbo.Drivers", new[] { "UserID" });
            DropIndex("dbo.Drivers", new[] { "NationalID" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Requests", new[] { "ClientID" });
            DropIndex("dbo.Clients", new[] { "UserID" });
            DropTable("dbo.Trips");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.OnlineConnections");
            DropTable("dbo.Notifcations");
            DropTable("dbo.NewApplicants");
            DropTable("dbo.Drivers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Requests");
            DropTable("dbo.Clients");
        }
    }
}
