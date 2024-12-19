import { Component, OnInit } from '@angular/core';
import { SystemService } from '../services/system.service';
import { Groups } from '../models/system.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ComfirmeDialogComponent } from '../dialog-components/comfirme-dialog/comfirme-dialog.component';
import { comfirmeDialogMode } from '../container/add-role/add-role.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public systemService:SystemService, private dialog:MatDialog ) { }

  ngOnInit(){
     
  }

  openComfireDialog(){
    this.dialog.open(ComfirmeDialogComponent, {
        panelClass:'custom-background',
        data:{signout:comfirmeDialogMode.signout}
    })
  }  
}

