import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ActivatedRoute, Params} from "@angular/router";
import {ServiceUsedModelService} from "../../../../http/model/service-used-model/service-used-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ServiceUsedObject} from "../../../../http/model/service-used-model/serviceUsedObject";
import {PrestaMapperService} from "../../../../mapper/presta-mapper.service";
import {
  ServiceEnterpriseModelService
} from "../../../../http/model/service-enterprise-model/service-enterprise-model.service";
import {ServiceEnterpriseObject} from "../../../../http/model/service-enterprise-model/ServiceEnterpriseObject";
import {ServiceUsedFromBailleur} from "../../../../http/model/service-used-model/ServiceUsedFromBailleur";

@Component({
  selector: 'pm-list-presta',
  templateUrl: './list-presta.component.html',
  styleUrls: ['./list-presta.component.scss']
})
export class ListPrestaComponent implements OnInit {

  services:ListObject[] = [];
  filters:FilterObject[] = [
    {name : 'appartement' , type:'hided', choices:[], set:true},
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
    GlobalService.pageName = "Prestation sur mes Appartements";
    this.route.queryParams.subscribe((query:Params)=>{
        if (query["apart"]){
          this.filters[0].default = query["apart"];
          this.filters[0].type = 'choice';
        }
        this.serviceUsedModelService.get_from_bailleur()
          .subscribe(
            (service:ServiceUsedFromBailleur[])=>
              this.setService(
                service.map(
                  (sObject:ServiceUsedFromBailleur)=>
                    PrestaMapperService.model_to_list_SUFB(sObject)
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
