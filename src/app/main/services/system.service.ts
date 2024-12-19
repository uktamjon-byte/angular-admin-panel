import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { delay, map } from "rxjs/operators";
import { IGroups } from "../interfaces/systen.interface";


@Injectable()
export class SystemService{
    public toggleSidebar = new BehaviorSubject<boolean>(false);
    public showBackDrop = new BehaviorSubject<boolean>(false);
    public showDropList = new BehaviorSubject<boolean>(false);
   
 

   constructor(private http:HttpClient){

    this.toggleSidebar.subscribe(res=>{
       console.log('--', res); 
    });
   }

   getAllGroups(){
      return this.http.get('http://localhost:3000/groups')
      .pipe(
         map((data:any)=> data? data : undefined),
         delay(3000)
      )
     }

     getGroupRolesLengthById(id:number){
      return this.http.get(`http://localhost:3000/groupRoles?groupId=${id}`)
      .pipe(
         map((data:any)=> data? data : undefined)
      )
     }

     getGroupRolesById(id:number, page:number){
      console.log('get group by id')
      return this.http.get(`http://localhost:3000/groupRoles?groupId=${id}&_page=${page}&_limit=10`)
      .pipe(
         map((data:any)=> data? data : undefined),
         delay(3000)
      )
     }

     postGroup(group:IGroups){
      return this.http.post('http://localhost:3000/groups',group)
      .pipe(
         map((data:any)=> data? data : undefined),
         delay(3000)
      )
     }

     updateGroup(data:any){
      console.log('service data', data)
         return this.http.put(`http://localhost:3000/groups/${data.id}`, data)
         .pipe(
            map((data:any)=> data? data : undefined),
            delay(3000)
         )
     }
   
}