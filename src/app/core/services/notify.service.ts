import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifyMessageType } from "../classes/enams/core.enum";

@Injectable()
export class NotifyService{
   constructor(private _snackBar: MatSnackBar){}
     showNotification(
        message: string,
        type: NotifyMessageType = NotifyMessageType.notify,
        duration: number = 5000,
        action: string = ''
     ){
        this._snackBar.open(message, action, {
            panelClass: [type],
            duration: duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
     }
}