import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ServiceUsedModelService} from "../../../../http/model/service-used-model/service-used-model.service";
import {ServiceUsedObject} from "../../../../http/model/service-used-model/serviceUsedObject";
import {PrestaMapperService} from "../../../../mapper/presta-mapper.service";
import {GlobalService} from "../../../../shared/global.service";

@Component({
  selector: 'pm-service-rendu-list',
  templateUrl: './service-rendu-list.component.html',
  styleUrls: ['./service-rendu-list.component.scss']
})
export class ServiceRenduListComponent implements OnInit {

  services:ListObject[] = [];
  filters:FilterObject[] = [
    {name : 'service.id' , type:'hided', choices:[], set:true},
    {name : 'etat_date' , type:'auto'},
    {name : 'ville' , type:'auto'},
    {name : 'service', type:'auto'},
    {name : 'tarif', type:'auto'},
  ]
  critera : string[] = [
    'utilisateur',
    'ville',
    'service',
    'appartement'
  ];


  constructor(
    private route :ActivatedRoute,
    private serviceUsedModelService:ServiceUsedModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Prestation";
    this.route.queryParams.subscribe((query:Params)=>{
      if (query["fromService"]){
        this.filters[0].default = query["fromService"];
        this.filters[0].type = 'choice';
      }
      this.serviceUsedModelService.get_serviceUsed()
        .subscribe(
          (serviceUsed:ServiceUsedObject[])=>
          this.setService(
            serviceUsed.map(
              (sObject:ServiceUsedObject)=>
                PrestaMapperService.model_to_list(sObject)
            )
          )
        )
      }
    )
  }

  private setService(serviceUsed:ListObject[]){
    this.services = serviceUsed;
  }

}
