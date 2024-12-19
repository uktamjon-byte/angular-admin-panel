import { Pipe, PipeTransform } from "@angular/core";
import { RolePermissions } from "../enums/system.enum";

@Pipe({
    name:'permissionPipe',
})
export class PermissionPipe implements PipeTransform{
    
    transform(value:any) {
       let  title:any;
        switch(value){
            case RolePermissions.Edit:
              title = 'Edit';
                  break;
            case RolePermissions.Delete: 
               title = 'Delete';
                  break;
            case RolePermissions.Update:
                title = 'Update';
                  break;
            case RolePermissions.Manage:
                title = 'Manage';
                  break;
            case RolePermissions.Sale:
                title = 'To sale';
                  break;
            case RolePermissions.ShowInfo:
                title = 'Show Info';
                  break;
            case RolePermissions.SelectCustomer:
                title = 'Select Customer';
                  break;
        }
        return title;
    }
}