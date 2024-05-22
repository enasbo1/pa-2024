import {Component, EventEmitter, OnInit} from '@angular/core';
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";
import {RubricElement, RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {EnterpriseModelService} from "../../../../http/model/enterprise-model/enterprise-model.service";
import {EnterpriseObject} from "../../../../http/model/enterprise-model/enterpriseObject";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {DateService} from "../../../../http/shared/date.service";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ServiceMapperService} from "../../../../mapper/service-mapper.service";
import {GlobalService} from "../../../../shared/global.service";


@Component({
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  service_rendu:string  = '/admin/service_rendu';
  query_params?:Params;

  private enterprise:RubricElement =
    {name:'entreprise', text:'none', type:'text'};

  service_object?:ServiceObject;

  service?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private serviceModelService : ServiceModelService,
              private enterpriseService: EnterpriseModelService,
              private route: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Service";
    this.route.params.subscribe((params:Params) => {
      this.query_params = {fromService:params["id"]};
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
    if (service) {
      this.service = ServiceMapperService.model_to_rubric(service);
      this.service.content.push(this.enterprise)
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
                name :'coef',
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
      }).subscribe(
        (editValues:FormFieldObject[])=>{
          this.to_edit(editValues);
        }
      )
    }
  }

  public openDeleteModal():void{
    if (this.service_object){
      ModaleService.createValidationModal('voulez-vous vraiment supprimer ce service ?').subscribe(
        (value)=>
          (value==="Oui")?this.delete():0
      )
    }
  }

  private to_edit(editValues:FormFieldObject[]):void{
    ModaleService.createValidationModal('voulez-vous vraiment modifier ce service ?').subscribe(
      (value)=>
        (value==="Oui")?this.edit(editValues):0
    );
  }

  private edit(values:FormFieldObject[]):void{
    if (this.service_object){
      let dates = this.getDate(values.find((x)=>x.name==="date")?._values)
      let service:ServiceObject = {
        id:this.service_object.id as number,
        type:FormService.get_value(values, 'type', this.service_object.type) as string,
        description:FormService.get_value(values, 'description', this.service_object.description) as string,
        tarif:FormService.get_value(values, 'tarif', this.service_object.tarif) as number,
        date_debut:dates.start,
        date_fin:dates.end,
        note:FormService.get_value(values, 'note', this.service_object.note) as  number,
        fiche:FormService.get_value(values, 'fiche', this.service_object.fiche) as string,
        coef:FormService.get_value(values, 'coef', this.service_object.coef) as number
      }
      let error:EventEmitter<HttpErrorResponse>=new EventEmitter<HttpErrorResponse>();
      error.subscribe(
        ()=>
          ModaleService.createTextModal("erreur lors de la modification du service")
      )
      this.serviceModelService.edit_service(service, error).subscribe(
        ()=>{
          ModaleService.createTextModal("service mis à jour avec succès");
          this.ngOnInit()
        }
      );
    }
  }

  private getDate(dates?:Date[]):{start:string, end:string}{
    if (dates){
      return {
        start:DateService.to_api(dates[0]),
        end :DateService.to_api(dates[1])
      }
    }else{
      return {
        start:DateService.to_api(),
        end :DateService.to_api()
      }
    }
  }

  private delete():void{
    if (this.service_object){
      let error:EventEmitter<HttpErrorResponse>=new EventEmitter<HttpErrorResponse>();
      error.subscribe(
        ()=>
          ModaleService.createTextModal("erreur lors de la suppression du service")
      )
      this.serviceModelService.delete_service(BigInt(this.service_object.id), error).subscribe(
        ()=>{
          ModaleService.createTextModal("service supprimé avec succès");
          this.router.navigateByUrl("/admin/services")
        }
      )
    }
  }
}
