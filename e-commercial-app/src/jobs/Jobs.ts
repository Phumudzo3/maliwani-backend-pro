import { Database } from "./Database";
import { Email } from "./Email";

export class Jobs{
    static excuteJobs(){
   Database.runDatabaseJobs();
   Email.runEmailJobs();
   
    }   
   }