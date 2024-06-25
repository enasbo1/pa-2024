import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {ServiceMapperService} from "../../../../mapper/service-mapper.service";

@Component({
  selector: 'pm-presate-services',
  templateUrl: './prestate-services.component.html',
  styleUrls: ['./prestate-services.component.scss',
    '../../../../shared/base-shared/form-step/form-step.component.scss'
  ]
})
export class PrestateServicesComponent implements OnInit {
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
