import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {IProduct} from "../../products/product";
import {ListObject} from "../../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class GenListService {
  private productUrl = 'api/gen/list-elements.json';

  constructor(private http:HttpClient) {};
  getProduct(): Observable<ListObject[]>{
    return this.http.get<ListObject[]>(this.productUrl).pipe(
      catchError(this.handelError)
    );
  }
  private handelError(errorMessage: HttpErrorResponse){
    console.error(errorMessage);
    return throwError(()=>errorMessage)
  }
}
