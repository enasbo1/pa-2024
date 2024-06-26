import {ServiceEnterpriseObject} from "./ServiceEnterpriseObject";
import {ApartmentObject} from "../apartment-model/ApartmentObject";

export interface ServiceThrowApartmentObject extends ServiceEnterpriseObject{
  apartment : ApartmentObject
}
