import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ConstancesService} from "./constances.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";
import {GlobalService} from "../../shared/global.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService{

  constructor(
    public httpClient:HttpClient,
    public translator:TranslatorService
  ) { }

  handelError(errorMessage: HttpErrorResponse){
    console.error(errorMessage);
    return throwError(()=>errorMessage)
  }

  private emitError(errorCatch:EventEmitter<HttpErrorResponse>, errorMessage:HttpErrorResponse){
    errorCatch.emit(errorMessage);
    return throwError(()=>errorMessage)
  }
  post(content:object, url:string, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.httpClient.post(ConstancesService.api_url + "/" +url,
      JSON.stringify(content),
      {
        headers:{
          "token":GlobalService.token?GlobalService.token:''
        }
      })
      .pipe(catchError(
        (errorMessage:HttpErrorResponse):Observable<never>=>
          errorCatch?this.emitError(errorCatch, errorMessage):this.handelError(errorMessage)
      )
    );
  }

  edit(content:object, url:string, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.httpClient.patch(ConstancesService.api_url + "/" +url,
      JSON.stringify(content),{
      headers:{
        token:GlobalService.token?GlobalService.token:''
      },
      }
      )
        .pipe(catchError(
          (errorMessage:HttpErrorResponse):Observable<never>=>
            errorCatch?this.emitError(errorCatch, errorMessage):this.handelError(errorMessage)
        )
      );
  }

  delete(url:string, number:bigint, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.httpClient.delete(ConstancesService.api_url + "/" +url + '/'+ number,
      {
        headers:{
          "token":GlobalService.token?GlobalService.token:""
        }
      })
      .pipe(catchError(
          (errorMessage:HttpErrorResponse):Observable<never>=>
            errorCatch?this.emitError(errorCatch, errorMessage):this.handelError(errorMessage)
        )
      );
  }

  get(url:string, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.httpClient.get(ConstancesService.api_url + "/" +url,
      {
        headers:{
          "token":GlobalService.token?GlobalService.token:""
        }
      })
      .pipe(catchError(
        (errorMessage:HttpErrorResponse):Observable<never>=>
          errorCatch?this.emitError(errorCatch, errorMessage):this.handelError(errorMessage)
      )
    );
  }

  get_one(url:string, number:bigint, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.get(url + '/'+ number, errorCatch);
  }
}
