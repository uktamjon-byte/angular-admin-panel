import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {map, timeout, delay} from "rxjs/operators"

@Injectable()
export class AuthService{
   constructor(private http:HttpClient){}
   public accessDenied = new BehaviorSubject<boolean>(false);
  getUserByEmail(name:string){
   return this.http.get(`http://localhost:3000/users?email=${name}`)
   .pipe(
      map((data:any)=> data[0]? data[0] : undefined),
      delay(3000)
   )
  }
}