import { Injectable } from "@angular/core";

@Injectable()
export class LoggedService{
   isAuthentificated = false;
   login(){
     this.isAuthentificated = true;
   }

   logOut(){
    this.isAuthentificated = false;
    window.localStorage.clear()
   }

   isLoggedIn():boolean{
      return this.isAuthentificated;
   }
}