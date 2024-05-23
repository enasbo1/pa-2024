import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {WpPath} from "../../../../shared/routes";
import {PrestaMapperService} from "../../../../mapper/presta-mapper.service";
import {GlobalService} from "../../../../shared/global.service";
import {ServiceUsedModelService} from "../../../../http/model/service-used-model/service-used-model.service";


@Component({
  templateUrl: './voyageur-service.component.html',
  styleUrls: ['./voyageur-service.component.scss']
})
export class VoyageurServiceComponent implements OnInit {

  services:ListObject[] = []
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

  private detailPage:string = WpPath.voyageur.myservices;

  constructor(private serviceUsedModelService : ServiceUsedModelService) { }

  ngOnInit(): void {
    GlobalService.pageName = "Mes prestations";
    this.serviceUsedModelService.get_service_from_user().subscribe(
      (services)=>
        this.setServicebyUser(
          services.map(
            (serviceUsed)=>
              PrestaMapperService.model_to_list(serviceUsed,this.detailPage))
        )
    )
  }

  private setServicebyUser(service:ListObject[]):void{
    this.services = service
  }

}
