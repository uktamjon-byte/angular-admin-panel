import { catchError, debounceTime, distinctUntilChanged, finalize, map } from 'rxjs/operators';
import { SystemService } from './../../services/system.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, Subscription, fromEvent, pipe } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { NotifyMessageType } from 'src/app/core/classes/enams/core.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleDialogComponent } from '../../dialog-components/add-role-dialog/add-role-dialog.component';
import { ComfirmeDialogComponent } from '../../dialog-components/comfirme-dialog/comfirme-dialog.component';
import { EditRolePermissionsComponent } from '../../dialog-components/edit-role-permissions/edit-role-permissions.component';
import { DialogService } from '../../dialog-components/dialog-service.service';
import { GroupRole } from '../../models/system.model';
enum typeFilter {
  showAll='showAll',
  byTag='byTag',
  byMark='byMark'
}

export enum diologMode{
  edit = 'edit',
  add = 'add'
}

 export enum comfirmeDialogMode{
  signout = 'signout',
  deleterole = 'deleterole'
}
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    public systemService:SystemService, 
    private route:ActivatedRoute,
    private notifyService:NotifyService,
    private dialog:MatDialog,
    private dialogService:DialogService
    ) { }

  @ViewChild('searchInput') searchInput!: ElementRef;
  options:any[] = [];
  selectedOption:{name:string, type:typeFilter, icon:string}={name: 'Show All', type:typeFilter.showAll,icon:'string'};
  id:number = 0;
  sub1:Subscription | any;
  sub2:Subscription | any;
  sub3:Subscription | any;
  page:number = 1;
  groupRoles:GroupRole[]=[];
  mainGroupRoles:GroupRole[]=[];
  isSpinnerBarOn = false;
  editResponse:any;
  deletedRoleId:number = 0;
  deletedRolePermissionId:number = 0;
  totalAmountElement:number = 0;
  currentPage:number = 1;
  ngOnInit() {
  
    this.route.params.subscribe((params:Params)=>{
      this.currentPage = 1;
      this.id = +params.id;
      console.log('params', params);
     // this.isSpinnerBarOn = true;
      this.getRequest();    
  
    this.systemService.getGroupRolesLengthById(this.id)
    .subscribe((res)=>{
       this.totalAmountElement = res.length;
       console.log('total elemam',this.totalAmountElement )
    });
    });

    this.options = [
      {name: 'Show All', type:typeFilter.showAll, icon:'la-book'},
      {name: 'By Tag', type:typeFilter.byTag, icon:'la-tag'},
      {name: 'By Mark', type:typeFilter.byMark, icon:'la-check'}
    ];

    
  }
  getRequest(){
    this.isSpinnerBarOn = true;
    this.sub1 = this.systemService.getGroupRolesById(this.id, this.currentPage)
    .pipe(
      catchError((er:any)=>{
        console.log('dcfsfs')
        this.notifyService.showNotification(
          'Something went wrong, try again later',
           NotifyMessageType.error,
        );
        return EMPTY;
      }),
      finalize(() => {
        this.isSpinnerBarOn = false;
      }),
    )
    .subscribe((groupRoles)=>{
      console.log('groupRoles',groupRoles);
      this.groupRoles = groupRoles;
      this.mainGroupRoles = groupRoles;
    });
  }

  changePage(activePage:number){
    this.currentPage = activePage;
    this.getRequest()
   
    console.log('activepage', activePage)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.filter();
    }, 1500);
  }

  filter(){
    if(this.searchInput.nativeElement){
      fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((inputValue:any)=>inputValue.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text)=>{
          console.log('input text', text)
          if (this.selectedOption.type === typeFilter.byTag) {
            this.groupRoles = this.mainGroupRoles.filter((item) => {
              return item.tags.filter(
                (tag) => tag.toLowerCase().indexOf(text.toLowerCase()) > -1
              ).length > 0
                ? true
                : false;
            });
          }
      })
    }
  }

  

  selectOptionFilter(selectOptionFilter:any){
    console.log(selectOptionFilter);
    this.selectedOption = selectOptionFilter;
    this.systemService.showDropList.next(false)

    switch(selectOptionFilter.type){
      case typeFilter.showAll:
       this.searchInput.nativeElement.value = '';
       this.groupRoles = this.mainGroupRoles;
       this.groupRoles.forEach((item)=> item.checked = false)
       break;

       case typeFilter.byMark:
      
       this.groupRoles = this.mainGroupRoles.filter((item)=> item.checked);
       break;
    }
    
  }

  

  deleteRole(role:any){
     console.log('role', role)
    this.dialog.open(ComfirmeDialogComponent,{
         data:{delete: comfirmeDialogMode.deleterole, deletableRole:role}
    }).afterClosed().subscribe((deletedRole)=>{
      console.log('data from comf dialof',deletedRole)
      if(deletedRole){
        const deletedRolePermissionId =  deletedRole.deleteRolePermissionId;
        this.sub2 = this.dialogService.deleteRolePermission(deletedRolePermissionId)
        .pipe(
          catchError((e:any)=>{
            this.notifyService.showNotification(
              'Something went wrong,plaese try again later',
              NotifyMessageType.error
            )
            return EMPTY
          })
         )
        .subscribe((deletedPermission)=>{
          window.setTimeout(()=>{
            this.notifyService.showNotification(
              'Permissions have been deleted succesfully',
              NotifyMessageType.notify
            )
           },5000)
        })
      }
     

     

      console.log('deleted Role', deletedRole)
      if(deletedRole){
        const roleInx:number = this.groupRoles.findIndex((groupRole:any)=> groupRole.id === role.id);
       if(roleInx > -1){
        this.groupRoles.splice(roleInx, 1)
       }
       
       
      }
      
    })
  }

  editRole(editableData:any){
    console.log('editdata', editableData)
    this.dialog.open(AddRoleDialogComponent, {
    data:{dialogType:diologMode.edit, editData:editableData}
}).afterClosed().subscribe((editedData)=>{
  if(editedData){
   let editableGroup:any = this.groupRoles.find((group:any)=> group.id === editedData.id);
   editableGroup.title = editedData.title;
   console.log('editable group', editableGroup)
  }
 
  console.log('afterclose data', editedData)
})
  }

  openAddRoleDialog(){
    console.log('clissss', this.options)
    this.dialog.open(AddRoleDialogComponent, {
      data:{id:this.id , dialogType:diologMode.add}
    }).afterClosed().subscribe((postedData)=>{
      console.log('posteddata', postedData)
      
      if(!!postedData){
        this.groupRoles.push(postedData.data)
        const permissionList = {
          roleId:postedData.data.id,
          permissions:postedData.activeListData,
          title:postedData.data.title
        }
       this.sub3 =  this.dialogService.postRolePermissionList(permissionList)
             .pipe(
              catchError((e:any)=>{
                this.notifyService.showNotification(
                  'Something went wrong,plaese try again later',
                  NotifyMessageType.error
                )
                return EMPTY
              })
             )
             .subscribe((response:any)=>{
              console.log('response', response)
             window.setTimeout(()=>{
              this.notifyService.showNotification(
                'Permissions have been added succesfully',
                NotifyMessageType.notify
              )
             },5000)
              
             })
      }
    })
  }

  editPermittions(role:any){
    this.dialog.open(EditRolePermissionsComponent, {
      data:{role:role}
     })         
  }

  ngOnDestroy(){
    if(this.sub1){
      this.sub1.unsubscribe();
    }

    if(this.sub2){
      this.sub2.unsubscribe();
    }

    if(this.sub3){
      this.sub3.unsubscribe();
    }
  }
}
