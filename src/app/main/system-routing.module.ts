import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { AddRoleComponent } from './container/add-role/add-role.component';


const routes: Routes = [
  {path: '', component: SystemComponent, children:[
    {path: '', redirectTo: 'addRole/1'},
    {path:'addRole/:id', component: AddRoleComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }