import { Component, OnInit } from '@angular/core';
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {WpPath} from "../../../../shared/routes";
import {ServiceMapperService} from "../../../../mapper/service-mapper.service";
import {GlobalService} from "../../../../shared/global.service";

@Component({
  selector: 'pm-gestion-services',
  templateUrl: './gestion-services.component.html',
  styleUrls: ['./gestion-services.component.scss']
})
export class GestionServicesComponent implements OnInit {
  services:ListObject[] = [];

  filters:FilterObject[] = [
    {name : 'note' , type:'auto'},
    {name : 'etat_date',type:'auto'},
    {name : 'type', type:'auto'},
    {name : 'tarif', type:'auto'},
  ]
  critera : string[] = [
    'description',
    'number'
  ];

  constructor(private serviceModelService : ServiceModelService) { }

  ngOnInit(): void {
    GlobalService.pageName = "Services";
    this.serviceModelService.get_service().subscribe(
      (services:ServiceObject[])=>
      this.setServices(
        services.map(
          (service)=>
            ServiceMapperService.model_to_list(service))
      )
    )
  }

  private setServices(service:ListObject[]):void{
    this.services = service
  }

}
