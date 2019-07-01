export class Applicant {
    constructor(
        public NationalID:string ,
        public DriverName:string ,
        public  Age:number,

        public Password : string,
       
        public ConfirmPass : string,
       public phone:string,
        public Email : string,
        public CopyLicenseImage: string,
       
        public CarModel: string ,
        public CarColor: string ,
        public  CarType:string, 
        
        public IsDeleted:boolean
    )
    {

    }
}
