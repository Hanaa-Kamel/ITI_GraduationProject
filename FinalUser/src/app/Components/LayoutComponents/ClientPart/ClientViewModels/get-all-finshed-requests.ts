export class GetAllFinshedRequests {

constructor(
    
  public  RequestID: number,
  public Location :string,
  public  Destination :string,
  public   RequestTime:Date,
  public   ShippingType :string,
  public    DriverName :string,
  public   Bill :number,
  public   clientRate :number,
  public   DriverRate :number,
  public   TripTime:Date )
    {}
}


