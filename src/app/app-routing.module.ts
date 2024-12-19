import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: LoginComponent},
  {path:'system', loadChildren: ()=> import('./main/system.module').then(m=>m.SystemModule)},
  {path:'login', component: LoginComponent},
  {path: '**', component:NotFoundComponent}
 
];

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
