export class DriverDashboard {
    constructor(
        public RequestID?:number,
        public Location?:string,
        public Destination?:string,
        public RequestTime?:Date,
        public TripTime?:Date,
        public ShippingType?:string,
        public carType?:string,
        public ClientName?:string,
        public IsDeleted?:boolean,
        public clientID?:string

        )
    {

    }  

}
   