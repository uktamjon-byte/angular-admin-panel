import { Pipe, PipeTransform } from "@angular/core";
import { GroupType } from "../enums/system.enum";
@Pipe({
    name:'iconPipe',
})
export class GroupIconPipe implements PipeTransform{
    transform(value:GroupType):string {
        let typeScssClass:string = ''
        switch(value){
            case GroupType.Admins:
                        typeScssClass = 'las la-user-shield'
                     break;
            case GroupType.Managers:
                        typeScssClass = 'las la-tasks'
                    break;
            case GroupType.Support:
                        typeScssClass = 'las la-shopping-bag'
                    break;
        }     
        return typeScssClass;
    }
    
}