import {ServiceUsedObject} from "./serviceUsedObject";
import {ReservationObject} from "../reservation-model/ReservationObject";

export interface ServiceUsedFromBailleur extends ServiceUsedObject{
  reservation : ReservationObject
  
}
