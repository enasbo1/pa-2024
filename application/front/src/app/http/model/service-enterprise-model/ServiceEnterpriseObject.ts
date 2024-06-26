import {ServiceObject} from "../service-model/serviceObject";
import {EnterpriseObject} from "../enterprise-model/enterpriseObject";
import {ApartmentObject} from "../apartment-model/ApartmentObject";

export interface ServiceEnterpriseObject{
  id?:number
  tarif:number
  coef:number
  service : ServiceObject
  enterprise : EnterpriseObject
}
