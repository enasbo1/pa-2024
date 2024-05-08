import {Injectable} from '@angular/core';
import {RequestService} from "./request.service";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {catchError, Observable} from "rxjs";
import {GlobalService} from "../shared/global.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends RequestService{
  public success?:(success:boolean)=>void;

  connect(connectionForm:FormFieldObject[], success:(success:boolean)=>void){
    this.success = success;
    let connectionvalues = {
      password:connectionForm.find((x)=>x.name=="password")?._value,
      mail:connectionForm.find((x)=>x.name=="mail")?._value
    };
    this.post(connectionvalues, "connection")
      .pipe(catchError((errorMessage:HttpErrorResponse)=>this.handelError(errorMessage)))
      .subscribe(
      (res:object)=>
        // @ts-ignore
        this._success(res.token)
    )
  }

  private _success(token:string):void{
    GlobalService.token = token;
    if (this.success){
      this.success(true);
    }
  }

  override handelError(errorMessage: HttpErrorResponse): Observable<never> {
    if (this.success){
      switch (errorMessage.status){
        case 400:
        case 401:
          this.success(false);
          break;
      }
    }
    return super.handelError(errorMessage);
  }
}
