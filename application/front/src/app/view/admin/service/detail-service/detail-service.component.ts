import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ActivatedRoute} from "@angular/router";
import {ServiceObject} from "../../../../http/model/service-model/ServiceObject";

@Component({
  selector: 'pm-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  enterprise:ListObject[] = []
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

  service?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private serviceModelService : ServiceModelService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceModelService.get_one_service(params['id']).subscribe(
        (service:ServiceObject[])=>
        this.set_services(service[0]?service[0]:undefined)
      )
    });
  }

  private set_services(service?:ServiceObject):void{
    this.service = {
      title : service?.type,
      content : [
        {name : 'note', type:'stars', text:"", value:service?.note},
        {name : 'tarif', type:'text', text:service?.tarif+'€'},
        {name : 'id', type:'text', text:service?.id.toString()},
        {name : 'type', type:'text', text:service?.type},
        {name : 'description', type:'text', text:service?.description},
        {name : 'date_debut', type:'text', text:service?.date_debut},
        {name : 'date_fin', type:'text', text:service?.date_fin},
        {name : 'fiche', type:'text', text:service?.fiche},
        {name : 'coef', type:'text', text:service?.coef.toString()},
      ]
    }
  }

}
