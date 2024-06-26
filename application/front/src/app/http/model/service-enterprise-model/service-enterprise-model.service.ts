import { Injectable } from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {Observable} from "rxjs";
import {ServiceThrowApartmentObject} from "./ServiceThrowApartmentObject";

@Injectable({
  providedIn: 'root'
})
export class ServiceEnterpriseModelService extends RequestService{

  get_from_bailleur():Observable<ServiceThrowApartmentObject[]>{
    return this.get("service_enterprise/bailleur/current") as Observable<ServiceThrowApartmentObject[]>;
  }
}
