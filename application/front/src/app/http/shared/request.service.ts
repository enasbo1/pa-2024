import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ConstancesService} from "./constances.service";
import {GlobalService} from "../../shared/global.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService{
  constructor(public httpClient:HttpClient) { }
  handelError(errorMessage: HttpErrorResponse){
    console.error(errorMessage);
    return throwError(()=>errorMessage)
  }
  post(content:object, url:string):Observable<object>{
    return(this.httpClient.post(ConstancesService.api_url + "/" +url,
      JSON.stringify(content)));
  }

  get(url:string):Observable<object>{
    return(this.httpClient.get(ConstancesService.api_url + "/" +url))
  }

  get_one(url:string, number:bigint):Observable<object>{
    return this.get(url + '/'+ number);
  }
}
