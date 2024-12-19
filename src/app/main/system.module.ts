import { NgModule } from "@angular/core";
import { SystemComponent } from "./system.component";
import { SystemRoutingModule } from "./system-routing.module";
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SystemService } from "./services/system.service";
import { CommonModule } from "@angular/common";
import { AddRoleComponent } from './container/add-role/add-role.component';
import { HttpClientModule } from "@angular/common/http";
import { GroupIconPipe } from "./pipes/group-icon.pipe";
import { GroupSortPipe } from "./pipes/groups-sort.pipe";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DialogMenuComponent } from './dialog-components/dialog-menu/dialog-menu.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComfirmeDialogComponent } from './dialog-components/comfirme-dialog/comfirme-dialog.component';
import { AddRoleDialogComponent } from './dialog-components/add-role-dialog/add-role-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PermissionPipe } from "./pipes/permission-title.pipe";
import { DialogService } from "./dialog-components/dialog-service.service";
import { EditRolePermissionsComponent } from './dialog-components/edit-role-permissions/edit-role-permissions.component';
import { RolePaginationComponent } from './container/role-pagination/role-pagination.component';

@NgModule({
    declarations:[
       SystemComponent,
       NavbarComponent,
       SidebarComponent,
       AddRoleComponent,
       GroupIconPipe,
       GroupSortPipe,
       DialogMenuComponent,
       ComfirmeDialogComponent,
       AddRoleDialogComponent,
       PermissionPipe,
       EditRolePermissionsComponent,
       RolePaginationComponent
    ],
    imports:[
       SystemRoutingModule,
       CommonModule,
       HttpClientModule,
       MatProgressSpinnerModule,
       MatDialogModule,
       FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
    ],
    providers:[
      SystemService,
      DialogService
    ]
})
export class SystemModule{

}