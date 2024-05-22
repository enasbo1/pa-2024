import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http:HttpClient) {};
    getProduct(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data=>console.log('All: ', JSON.stringify(data))),
            catchError(this.handelError)
            );
    }
    private handelError(errorMessage: HttpErrorResponse){
        console.error(errorMessage);
        return throwError(()=>errorMessage)
    }

}