import { Component, ViewEncapsulation } from '@angular/core';
import { SystemService } from './services/system.service';
@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
    encapsulation:ViewEncapsulation.None
  })
export class SystemComponent{
  constructor(public systemService:SystemService){}
 
  showBackdrop(){
    this.systemService.toggleSidebar.next(false)
    console.log('backdropclick')
  }
}