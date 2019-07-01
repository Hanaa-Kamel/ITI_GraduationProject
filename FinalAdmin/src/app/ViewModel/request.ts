export class Request {
    constructor
    (
        public Location:string,
        public Destination:string,
        public RequestTime:Date,
        public TripTime:Date,
        public ShippingType:string,
        public carType:string,
        public  ClientName:string,
        public  DriverName :string,
        public  Bill: DoubleRange,
        public  clientRate :number, 
        public  DriverRate :number
    )
    {

    }
}
