import { DialogMode, IGroupForm } from './../dialog-components/dialog-menu/dialog-menu.component';
import { NotifyService } from './../../core/services/notify.service';
import { catchError } from 'rxjs/operators';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SystemService } from '../services/system.service';
import { Groups } from '../models/system.model'; 
import { EMPTY, Subscription } from 'rxjs';
import { NotifyMessageType } from 'src/app/core/classes/enams/core.enum';

import { MatDialog } from '@angular/material/dialog';
import { DialogMenuComponent} from '../dialog-components/dialog-menu/dialog-menu.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  constructor(
    public systemService:SystemService, 
    private notifyService:NotifyService, 
    private dialog:MatDialog
    ) { }
  AllGroups:Groups[] = [];
  loadRoles = false;
  sub1:Subscription | any;
  title:string = '';
  user:any;

  openDialog(){
    this.dialog.open(DialogMenuComponent,{
      panelClass:'custom-background',
      data: {type: DialogMode.add}
    })
    .afterClosed().subscribe((result:any)=>{
      console.log('dialog result', result);
      console.log('afterclose');
      
       if(result){
        this.AllGroups.push(result); 
       }
     
    });
    console.log('click btn')
  }
  getUserFromLocalStorage(){
    const user = window.localStorage.getItem('userdata');
    if(user){
      this.user =  JSON.parse(user);  

    }
  }

  ngOnInit() {
    this.getUserFromLocalStorage()
    console.log('userdata', this.user)
    this.sub1 = this.systemService.getAllGroups()
    
    .pipe(
      catchError((er:any)=>{
        this.notifyService.showNotification(
          'Something went wrong, try again later',
           NotifyMessageType.error,
        )
         return EMPTY;
      })
    )
   
    .subscribe((groups)=>{
      console.log('groups', groups); 
      this.AllGroups = groups;
      console.log('algr', this.AllGroups);
    })
  }

  editGroup(editableGroup:any){
  //  console.log(e);
    ///e.stopPropagation();
    this.dialog.open(DialogMenuComponent,{
      panelClass:'custom-background',
      data: {type:DialogMode.edit, group:editableGroup}
   
    }).afterClosed().subscribe((res:any)=>{
      console.log(res);
      if(res){
        let editableGroup:any = this.AllGroups.find((item:any)=> item.id === res.id);
        if(editableGroup){
        editableGroup.title = res.title;
        editableGroup.groupType = res.groupType;
      }
        console.log('aftercloseedited', editableGroup)
        // this.AllGroups.push(editableGroup);
      }
    });

  }

  ngOnDestroy(){
   if(this.sub1){
    this.sub1.unsubscribe();
   }
  }

}
