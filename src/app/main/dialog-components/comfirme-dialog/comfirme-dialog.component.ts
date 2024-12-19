import { NotifyService } from './../../../core/services/notify.service';
import { catchError } from 'rxjs/operators';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/auth/logged.service';
import { DialogService } from '../dialog-service.service';
import { comfirmeDialogMode } from '../../container/add-role/add-role.component';
import { EMPTY, Subscription } from 'rxjs';
import { NotifyMessageType } from 'src/app/core/classes/enams/core.enum';

@Component({
  selector: 'app-comfirme-dialog',
  templateUrl: './comfirme-dialog.component.html',
  styleUrls: ['./comfirme-dialog.component.scss']
})
export class ComfirmeDialogComponent implements OnInit, OnDestroy {

  constructor(
    private dialogRef: MatDialogRef<ComfirmeDialogComponent>,
    private router:Router,
    private loggedService:LoggedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogService:DialogService,
    private notifyService:NotifyService
     ) { }

     isDeletable = false;
     isBackDropOn = false;
     sub1:Subscription | any;
     title = '';
     permissionRoleId:number = 0;

  ngOnInit(){
    console.log('comfire data', this.data)
    
     if(this.data.delete === comfirmeDialogMode.deleterole){
      this.title = this.data.deletableRole.title;
        this.isDeletable = true;
     }
     console.log('deletetrue', this.data.deletableRole)
  }


  closeDialog(){
     this.dialogRef.close();
  }

  deleteRole(){
    this.isBackDropOn = true;
   
    this.dialogService.getRolePermission(this.data.deletableRole.id)
    .subscribe((deletedPermission)=>{
      if(deletedPermission){
        this.permissionRoleId = deletedPermission[0].id
      }    
         console.log('deletedPermission',deletedPermission)
    });

     this.sub1 = this.dialogService.deleteRole(this.data.deletableRole)
     .pipe(
      catchError((e:any)=>{
        this.notifyService.showNotification(
          'Something went wrong, try again later',
          NotifyMessageType.error
        )
        return EMPTY
      })
     )
     .subscribe((deletedRole)=>{
        console.log('delete role', deletedRole)
        this.isBackDropOn = false;
        this.dialogRef.close({deleteRole:this.data.deletableRole.id, deleteRolePermissionId:this.permissionRoleId});
        this.notifyService.showNotification(
          'Role has been deleted successfully',
          NotifyMessageType.notify
        )
     })

  }

  signOut(){
    this.router.navigate(['login'])
    this.loggedService.logOut()
    this.closeDialog()
  }

  submit(){   
     if(this.data.delete === comfirmeDialogMode.deleterole){
       this.deleteRole()
       console.log('delete', this.data.delete)
     }else{
       this.signOut()
       console.log('delete')
     }
  }

  ngOnDestroy(){
     if(this.sub1){
      this.sub1.unsubscribe()
     }
  }
}