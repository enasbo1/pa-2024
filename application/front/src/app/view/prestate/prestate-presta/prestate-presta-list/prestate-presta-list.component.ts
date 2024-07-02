import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ActivatedRoute, Params} from "@angular/router";
import {ServiceUsedModelService} from "../../../../http/model/service-used-model/service-used-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ServiceUsedObject} from "../../../../http/model/service-used-model/serviceUsedObject";
import {PrestaMapperService} from "../../../../mapper/presta-mapper.service";

@Component({
  selector: 'pm-prestate-presta-list',
  templateUrl: './prestate-presta-list.component.html',
  styleUrls: ['./prestate-presta-list.component.scss']
})
export class PrestatePrestaListComponent implements OnInit {

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
        this.serviceUsedModelService.get_from_prestate()
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
