import { Injectable } from '@angular/core';
import {ServiceEnterpriseObject} from "../http/model/service-enterprise-model/ServiceEnterpriseObject";
import {ListObject} from "../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class ServiceEnterpriseMapperService {
  static model_to_list(object:ServiceEnterpriseObject):ListObject{
    return {
      title:object.service.type,
      link:object.id?.toString(),
    }
  }
}
