import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { delay, map } from "rxjs/operators";

@Injectable()
export class DialogService{
    constructor(private http:HttpClient){}
    public editData:any;

    postGroupRoles(groupRoles:any){
        return this.http.post(`http://localhost:3000/groupRoles`,groupRoles)
        .pipe(
           map((data:any)=> data? data : undefined),
           delay(3000)
        )
       }

       updateRole(data:any){
        console.log('service data', data)
           return this.http.put(`http://localhost:3000/groupRoles/${data.id}`, data)
           .pipe(
              map((data:any)=> data? data : undefined),
              delay(3000)
           )
       }

       deleteRole(data:any){
         console.log('service data', data)
            return this.http.delete(`http://localhost:3000/groupRoles/${data.id}`)
            .pipe(
               map((data:any)=> data? data : undefined),
               delay(3000)
            )
        }

        deleteRolePermission(id:number){
         console.log('service data')
            return this.http.delete(`http://localhost:3000/rolePermissions/${id}`)
            .pipe(
               map((data:any)=> data? data : undefined),
               delay(3000)
            )
        }

        postRolePermissionList(rolePermissionList:any){
         return this.http.post(`http://localhost:3000/rolePermissions`,rolePermissionList)
         .pipe(
            map((data:any)=> data? data : undefined),
            delay(3000)
         )
        }

        getRolePermission(roleId:number){
         console.log('service data')
            return this.http.get(`http://localhost:3000/rolePermissions?roleId=${roleId}`)
            .pipe(
               map((data:any)=> data? data : undefined)
            )
        }

        updatePermission(data:any){
         console.log('service data', data)
            return this.http.put(`http://localhost:3000/rolePermissions/${data.id}`, data)
            .pipe(
               map((data:any)=> data? data : undefined),
               delay(3000)
            )
        }
}