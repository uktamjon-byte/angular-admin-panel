import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";

import { AuthService } from "./auth.service";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoggedService } from "./logged.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthGuard } from "./auth.guard";

@NgModule({
    declarations:[
        LoginComponent
      
    ],
 
    imports:[
        AuthRoutingModule,
        CommonModule,
        MatCheckboxModule,

        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    providers:[
        AuthService,
        LoggedService,
    ]
})
export class AuthModule{}