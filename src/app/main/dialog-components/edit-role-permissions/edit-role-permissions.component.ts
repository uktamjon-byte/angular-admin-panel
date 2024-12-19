import { Component, Inject, Input, OnInit } from '@angular/core';
import { PermissionDetail } from '../add-role-dialog/add-role-dialog.component';
import { RolePermissions } from '../../enums/system.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../dialog-service.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from 'src/app/core/services/notify.service';
import { NotifyMessageType } from 'src/app/core/classes/enams/core.enum';

@Component({
  selector: 'app-edit-role-permissions',
  templateUrl: './edit-role-permissions.component.html',
  styleUrls: ['./edit-role-permissions.component.scss']
})
export class EditRolePermissionsComponent implements OnInit {

  permissionsLists:PermissionDetail[]=[];
  activeList:any;
  isBackDropOn = false;
  permissionName = this.data.role.title;
  permissions:any[] = [];
  activePermissionId:number = 0;
  isSaveBtnOn = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogService:DialogService,
    private notifyService:NotifyService,
    private dialogRef: MatDialogRef<EditRolePermissionsComponent>,
  ) { }
 
  ngOnInit(): void {
    
    this.isBackDropOn = true;
    this.dialogService.getRolePermission(this.data.role.id)
    .pipe(
      catchError((e:any)=>{
        this.isBackDropOn = true;
        this.notifyService.showNotification(
          'Loading failed, please try again later',
          NotifyMessageType.error
        )
        return EMPTY
      })
    )
    .subscribe((perResponse:any)=>{ 
      const activePermission:any[] = perResponse[0].permissions;
      this.activePermissionId = perResponse[0].id
      this.permissionsLists.forEach((item:any)=>{
        if(activePermission.includes(item.permission)){
          item.active=true;
        }
      });
       this.notifyService.showNotification(
          'Permissions has been loaded successfully',
          NotifyMessageType.notify
        )
      this.isBackDropOn = false;
      console.log('editResponse',perResponse[0])
      console.log('editResponseIid',this.activePermissionId)
    })
    // let carObj = new Car();
    // let carObj1 = new Car();
    // let carObj2 = new Car();
    // let carObj3 = new Car();
    // carObj.run();
    // carObj.name = 'ewfrewrfew0';
    // console.log(carObj);


    console.log('editcomponenet data', this.data);
  //console.log('antuan perlist', this.data.res[0].permissions)

    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.Edit
    });
    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.Delete,
    });
    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.Update,
    });
    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.Manage,
    });
    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.Sale,
    });
    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.ShowInfo,
    });
    this.permissionsLists.push({
      active: false,
      permission: RolePermissions.SelectCustomer,
    });

    console.log(this.permissionsLists);
    // this.permissionsLists.forEach((perItem:any)=>  
    // {
    //    perItem.active = this.data.res[0].permissions.includes((item:number)=> item === perItem.permission)? true : false;
    //    console.log('peritem', perItem)
    // });
  }

  activatePermission(perName:any){
    this.isSaveBtnOn = true;
    perName.active = !perName.active
    
   
    console.log('perlist', this.permissionsLists)
     console.log('pername', perName)
  }

  savePermissions(){
    
    this.isBackDropOn = true;
    this.permissionsLists.forEach((perItem:any)=>{
      if(perItem.active){
        this.permissions.push(perItem.permission)
      }
    })
     const postPermission = {
      id:this.activePermissionId,
      roleId:this.data.role.id,
      permissions:this.permissions,
      title:this.data.role.title
     }
     console.log('perData', postPermission)
     this.dialogService.updatePermission(postPermission)
     .pipe(
      catchError((e:any)=>{
        this.isBackDropOn = true;
        this.notifyService.showNotification(
          'Loading failed, please try again later',
          NotifyMessageType.error
        )
        return EMPTY
      })
    )
     .subscribe((postedPermission)=>{
      this.isBackDropOn = false;
      this.permissionsLists.forEach((item:any)=>{
        if(postedPermission.permissions.includes(item.permission)){
          item.active = true;
        }
      });
      this.dialogRef.close()
      this.notifyService.showNotification(
        'Permission has been edited successfully',
        NotifyMessageType.notify
      )
       console.log('posted permis',postedPermission)
     })
     
    console.log('permissions',this.permissions)
  }

  closeDialog(){
    this.dialogRef.close()
  }

}

// interface IAli{
//   color:string;
//   speed:Function
// }


// class Car implements IAli{
//   color: string='assas';

//   speed(){
    
//   }
//   public name= 'Alijon';
//   public title='Valijon';

//   constructor(){

//   }

//   run(){
//     console.log('run');
//   }
// }

