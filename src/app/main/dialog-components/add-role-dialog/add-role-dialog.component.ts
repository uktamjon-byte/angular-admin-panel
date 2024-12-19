import { DialogMode } from './../dialog-menu/dialog-menu.component';
import { NotifyMessageType } from 'src/app/core/classes/enams/core.enum';
import { catchError } from 'rxjs/operators';
import { 
  Component, 
  OnInit, 
  Inject, 
  OnDestroy
 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolePermissions } from '../../enums/system.enum';
import { DialogService } from '../dialog-service.service';
import { EMPTY, Subscription } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';



export interface PermissionDetail {
  active: boolean;
  permission: RolePermissions;
}

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})



export class AddRoleDialogComponent implements OnInit, OnDestroy {

  constructor(
    private dialogService:DialogService,
    private dialogRef: MatDialogRef<AddRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyService:NotifyService,
    ) { }

  addRoleForm:FormGroup | any;
  permissionsLists:PermissionDetail[]=[];

  addedTags:any[]= [];
  activeItemList:any[]=[];
  currentTagsBox = false;
  isAddRole = false;
  isEdit = false;
  isChooseOption = false;
  showBackDrop = false;
  sub1:Subscription | any;
  sub2:Subscription | any;
  sub3:Subscription | any;


  ngOnInit(){
    this.isAddRole = true;
    this.isChooseOption = false;
  
    this.addRoleForm = new FormGroup({
      'rolename': new FormControl('', Validators.required),
      'roletags': new FormControl('', Validators.required),
    });

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
    

    if(this.data.dialogType === 'edit'){
       this.isEdit = true;
       console.log('dialogdata', this.data)
       this.addRoleForm.patchValue({rolename:this.data.editData.title});
        this.addedTags = this.data.editData.tags;
        this.currentTagsBox = true;
      //console.log('data', this.data.editData.tags)
    }
    //console.log('addrole', this.addRoleForm)
    
  }

  
  
  
  addTag(){
    if(this.addRoleForm.value.roletags !== ''){
      this.addedTags.push(this.addRoleForm.value.roletags); 
      this.currentTagsBox = true; 
    }
     let tag = this.addedTags;
     this.addRoleForm.patchValue({roletags: ''});
     console.log('addteg', this.addedTags);
  }


  deleteTag(index:number){
    console.log('index', index)
    this.addedTags.splice(index, 1);
    if(this.addedTags.length === 0){
      this.currentTagsBox = false;
    }
  }

  closeDialog(){
    this.dialogRef.close()
  }

  nextToPermissionList(isEdit:any){
    if(isEdit){
      console.log('gamer')
    }else{
      this.isAddRole = false;
      this.isChooseOption = true;
      console.log('gamerist')

    }
  }

  backToForm(){
     this.isAddRole = true;
     this.isChooseOption = false;
  }
  
  activatePermission(index:number, itemList:any){
     
      if(this.permissionsLists[index]){
       this.permissionsLists[index].active=!this.permissionsLists[index].active;
       console.log('inx', this.permissionsLists[index])
      }
      
       
        if(this.permissionsLists[index].active){
           this.activeItemList.push(this.permissionsLists[index].permission)
        }else{
         let inx =  this.activeItemList.findIndex((item)=> item === itemList.permission);
          if(inx>-1){
            this.activeItemList.splice(inx, 1)
          }
          console.log('activeItem list', this.activeItemList)
        }
        // else{
        //    let listInx = this.activeItem.findIndex(list=> !list.active);
        //    this.activeItem.splice(listInx, 1)
        // }

       
      
      console.log('activeitem', this.activeItemList)
      console.log('itemlist', itemList)
    // const fullPermissions = {
    //   roleId:this.data.editData.id,
    //   permissions:[]
    // }

  }

  editRole(){
    const editRoles = {
      id:this.data.editData.id,
      groupId:this.data.editData.groupId,
      title:this.addRoleForm.value.rolename,
      tags:this.addedTags
    }
    console.log('dataeditable', editRoles)
   this.sub1 =  this.dialogService.updateRole(editRoles)
    .pipe(
      catchError((e:any)=>{
        this.notifyService.showNotification(
          'Something went wrong, try again later',
          NotifyMessageType.error
        )
         return EMPTY
      })
    )
    .subscribe((editedRoles)=>{
      this.showBackDrop = false;
      this.notifyService.showNotification(
        'Group role has been edited successfully',
         NotifyMessageType.notify
      )
      this.dialogRef.close(editedRoles)
      console.log('editedroles', editedRoles)
    })
  }

  addRole(){
    const roles = {
      groupId: this.data.id,
      title:  this.addRoleForm.value.rolename,
      tags: this.addedTags
    }
  this.sub2 = this.dialogService.postGroupRoles(roles)
     .pipe(
      catchError((e)=>{
        this.notifyService.showNotification(
         'Something went wrong, please try again later',
          NotifyMessageType.error
        )
         return EMPTY
      })
     )
     
     .subscribe((postedRoles)=>{
      this.showBackDrop = false;
      this.notifyService.showNotification(
        'Role has been created successfully ',
         NotifyMessageType.notify
       )
       console.log('added role sub', postedRoles)
        this.dialogRef.close({data:postedRoles,  activeListData:this.activeItemList})
     })
  }
  onSubmit(){
    console.log('submit')
    this.showBackDrop = true;
    if(this.data.dialogType === 'add'){
       this.addRole()
       console.log('add roles', this.data.dialogType)
    }else{
      this.editRole()
      console.log('edit roles' , this.data.dialogType)
    }
  }

  ngOnDestroy(){
    if(this.sub1){
     this.sub1.unsubscribe()
    }

    if(this.sub2){
      this.sub2.unsubscribe()
     }
 }
}
