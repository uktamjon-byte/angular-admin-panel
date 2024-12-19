import { catchError } from 'rxjs/operators';
import { IGroups } from './../../interfaces/systen.interface';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { GroupType } from '../../enums/system.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../utils/constants';
import { SystemService } from '../../services/system.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Subscription } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { NotifyMessageType } from 'src/app/core/classes/enams/core.enum';
import { Groups } from '../../models/system.model';

export enum DialogMode{
   edit =  'edit',
   add = 'add'
}

export interface IGroupDialogAction {
  group?: Groups;
  type: DialogMode;
}

export interface IGroupForm {
  groupname: string;
  grouptype: any;
}
@Component({
  selector: 'app-dialog-menu',
  templateUrl: './dialog-menu.component.html',
  styleUrls: ['./dialog-menu.component.scss'],
 
})


export class DialogMenuComponent implements OnInit, OnDestroy {
  
  get typeDialog(){
    return DialogMode;
  }
 
  constructor(
    private systemService:SystemService,
    private notifyService:NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: IGroupDialogAction,
    private dialogRef: MatDialogRef<DialogMenuComponent> 
    ) {}
  addGroupForm:FormGroup | any;
  groupTypeList:GroupType[]=[];
  showBackDrop = false;
  sub1:Subscription | any;
  sub2:Subscription | any;
  ngOnInit() {
    this.groupTypeList.push(GroupType.Admins);
    this.groupTypeList.push(GroupType.Managers);
    this.groupTypeList.push(GroupType.Support);

    this.addGroupForm = new FormGroup({
      'groupname': new FormControl('', Validators.required),
      'grouptype': new FormControl('', Validators.required),
   });

   if(this.data.type === DialogMode.edit){
    if(this.data.group){
      this.addGroupForm.patchValue({groupname:this.data.group.title, grouptype:this.data.group.groupType});
    }
   }

  
  }
  // openDialog() {
  //   this.dialog.open(DialogMenuComponent, {
  //     data: {
  //       animal: 'panda'
  //     }
  //   });
  // }


  add(){

    console.log('addform', this.addGroupForm)
    this.showBackDrop = true;
    let addGroupData:IGroupForm = this.addGroupForm.value;
    const group: IGroups = {
      title: addGroupData.groupname,
      accountId: Constants.accountId,
      groupType: addGroupData.grouptype,
    };
    this.sub1 = this.systemService.postGroup(group)
    .pipe(
      catchError((e:any)=>{
        this.notifyService.showNotification(
          'Something went wrong, try again later',
            NotifyMessageType.error
        )
        return EMPTY
      })
    )
    .subscribe((data:IGroups)=>{
      console.log('returndata', data);
      this.showBackDrop = false;
      this.dialogRef.close(data);
      this.notifyService.showNotification(
        'Group has been added succesfully',
        NotifyMessageType.notify
      )
    })
    console.log('data',group.title)
  }

  edit(){
    this.showBackDrop = true;
    let editGroupData:IGroupForm = this.addGroupForm.value;
   const editGroup = {
      id: this.data.group?.id,
      accauntId:this.data.group?.accountId,
      title: editGroupData.groupname, 
      groupType: editGroupData.grouptype,
   }
    console.log('editgroup', editGroup)
    this.sub2 = this.systemService.updateGroup(editGroup)
    .pipe(
      catchError((e:any)=>{
        this.notifyService.showNotification(
          'Something went wrong, try again later',
          NotifyMessageType.error
        )
        return EMPTY
      })
    )
   .subscribe((updatedData:any)=>{
    this.showBackDrop = false;
    this.notifyService.showNotification(
      'Group has been edited succesfully',
      NotifyMessageType.notify
    )
    this.dialogRef.close(updatedData);
    console.log('updeted data', updatedData)
   })
  }

  onSubmit(){
    console.log('submit')
    if(this.data.type === DialogMode.add){
      this.add();
    }else {
      this.edit();
    }
  }

  cancel(){
    this.dialogRef.close();
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
