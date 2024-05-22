import {Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {UserObject} from "./userObject";
import {ListObject} from "../../../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class UserModelService extends RequestService{

  get_user():Observable<UserObject[]>{
    return (this.get('users') as Observable<UserObject[]>);
  }

  get_one_user(number:bigint):Observable<UserObject[]>{
    return (this.get_one('users',number) as Observable<UserObject[]>);

  }
}
