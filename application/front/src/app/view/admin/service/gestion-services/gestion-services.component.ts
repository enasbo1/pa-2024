import { Component, OnInit } from '@angular/core';
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";

@Component({
  selector: 'pm-gestion-services',
  templateUrl: './gestion-services.component.html',
  styleUrls: ['./gestion-services.component.scss']
})
export class GestionServicesComponent implements OnInit {
  services:ListObject[] = [];

  filters:FilterObject[] = [
    {name : 'note' , type:'auto'},
    {name : 'date_debut' , type:'auto'},
    {name : 'date_fin' , type:'auto'},
    {name : 'type', type:'auto'},
    {name : 'tarif', type:'auto'},
  ]
  critera : string[] = [
    'description',
    'number'
  ];

  private detailPage:string = "/admin/services";

  constructor(private serviceModelService : ServiceModelService) { }

  ngOnInit(): void {
    this.serviceModelService.get_service().subscribe(
      (services:ServiceObject[])=>
      this.setServices(
        services.map(
          (service)=>
            this.serviceModelService.service_to_list(service, this.detailPage))
      )
    )
  }

  private setServices(service:ListObject[]):void{
    this.services = service
  }

}
