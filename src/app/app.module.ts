import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from './core/services/notify.service';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [NotifyService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
