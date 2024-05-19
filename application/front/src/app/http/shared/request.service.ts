import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {from, Observable, throwError} from "rxjs";
import {ConstancesService} from "./constances.service";

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

  edit(content:object, url:string):Observable<object>{
    return this.httpClient.patch(ConstancesService.api_url + "/" +url,
      JSON.stringify(content));
  }

  delete(url:string, number:bigint):Observable<object>{
    return(this.httpClient.delete(ConstancesService.api_url + "/" +url + '/'+ number))
  }

  get(url:string):Observable<object>{
    return(this.httpClient.get(ConstancesService.api_url + "/" +url))
  }

  get_one(url:string, number:bigint):Observable<object>{
    return this.get(url + '/'+ number);
  }
}
