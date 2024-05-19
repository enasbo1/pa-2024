import { Component, OnInit } from '@angular/core';
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {RubricElement, RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ActivatedRoute} from "@angular/router";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {EnterpriseModelService} from "../../../../http/model/enterprise-model/enterprise-model.service";
import {EnterpriseObject} from "../../../../http/model/enterprise-model/enterpriseObject";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";


@Component({
  selector: 'pm-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {

  private enterprise:RubricElement =
    {name:'entreprise', text:'none', type:'text'};

  service_object?:ServiceObject;

  service?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private serviceModelService : ServiceModelService,
              private enterpriseService: EnterpriseModelService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceModelService.get_one_service(params['id']).subscribe(
        (service:ServiceObject[])=>
        this.set_services(service[0]?service[0]:undefined)
      );
      this.enterpriseService.get_enterprise_from_service_id(params['id']).subscribe(
        (entreprise)=>
          this.set_entreprise(entreprise)
      )
    });
  }

  private set_services(service?:ServiceObject):void{
    this.service_object = service;
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
        this.enterprise
      ]
    }
  }

  private set_entreprise(entreprise?:EnterpriseObject[]):void{
    this.enterprise.value = <RubricObject>{
      title:"entreprises",
      content:entreprise?.map(
        this.enterprise_to_rubric_Element
      )
    }
    this.enterprise.type = (entreprise?.length?entreprise.length>0:false)?'modal':'text';
    this.enterprise.text = entreprise?.length+ ' - entreprises'
  }

  private enterprise_to_rubric_Element(enterprise:EnterpriseObject):RubricElement{
    return {
      name : enterprise.nom,
      type : 'link',
      text : 'voir plus',
      value : 'admin/enterprise/'+enterprise.id
    }
  }

  public openEditModal():void{
    if (this.service_object){
      ModaleService.createFormModal({
        title:'modifier le service',
        content:[
          {
            title : 'details',
            content:[
              {
                name:'type',
                type:'text',
                title:'type : ' + this.service_object.type,
                placeholder:this.service_object.type,
                default:this.service_object.type,
              },
              {
                name:'description',
                type:'longtext',
                title:'description',
                placeholder:this.service_object.description,
                default:this.service_object.description,
              },
            ]
          },
          {
            title:'dates',
            content:[
              {
                name :'date',
                type :'period',
              },
            ]
          },
          {
            title:'divers',
            content:[
              {
                title: 'note : '+ this.service_object.note,
                name :'note',
                type :'num',
                step:0.1,
                number_limit:{
                  max:5,
                  min:0
                },
                default: this.service_object.note,
                placeholder: this.service_object.note
              },
              {
                title: 'coef : '+ this.service_object.coef,
                name :'note',
                type :'num',
                step:0.1,
                number_limit:{
                  min:0.01
                },
                default: this.service_object.coef,
                placeholder: this.service_object.coef
              },
              {
                title: 'fiche : '+ this.service_object.fiche,
                name :'fiche',
                type :'file',
                default: this.service_object.fiche,
                placeholder: this.service_object.fiche
              },
            ]
          }

        ]
      })
    }
  }

  public openDeleteModal():void{
    if (this.service_object){
      ModaleService.createTextModal('To be Implemented')
    }
  }
}
