import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SystemComponent } from '../main/system.component';

const routes: Routes = [
     //{path: '', pathMatch:'full', component: LoginComponent}
    //  {path: 'system', component: SystemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }