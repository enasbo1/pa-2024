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
import {ServiceUsedModelService} from "../../../../http/model/service-used-model/service-used-model.service";
import {ServiceUsedObject} from "../../../../http/model/service-used-model/serviceUsedObject";


@Component({
  templateUrl: './detail-service-rendu.component.html',
  styleUrls: ['./detail-service-rendu.component.scss']
})
export class DetailServiceRenduComponent implements OnInit {
  service_rendu:string  = '/admin/service_rendu';
  query_params?:Params;

  private enterprise:RubricElement =
    {name:'entreprise', text:'none', type:'text'};

  service_object?:ServiceUsedObject;

  service?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private serviceUsedModelService : ServiceUsedModelService,
              private route: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.serviceUsedModelService.get_one_serviceUsed(params['id']).subscribe(
        (service:ServiceUsedObject[])=>
          this.set_services(service[0]?service[0]:undefined)
      );
    });
  }

  private set_services(serviceUsed?:ServiceUsedObject):void{
    this.service_object = serviceUsed;
    if (serviceUsed?.entreprise){
      this.set_enterprise([serviceUsed?.entreprise])
    }
    this.service = {
      title : "service rendu : " + serviceUsed?.service?.type,
      content : [
        {name : 'id', type:'text', text: serviceUsed?.id.toString()},
        {name : 'modif', type:'text', text : DateService.to_front(serviceUsed?.date_debut)},
        {name : 'date', type:'text', text: DateService.to_front(serviceUsed?.date_debut)},
        {name : 'lieu', type:'text', text: serviceUsed?.reservation?.ville},

        {name : 'reservation', type:'link',
          text:serviceUsed?.reservation?.id_reservation.toString(),
          value:'admin/reservation/'+serviceUsed?.id
        },

        {name : 'entreprise', type:'link',
          text:serviceUsed?.entreprise?.nom,
          value:'admin/enterprise/'+serviceUsed?.entreprise.id
        },

        {name : 'utilisateur', type:'link',
          text:serviceUsed?.entreprise?.nom,
          value:'admin/enterprise/'+serviceUsed?.entreprise.id
        },
        {name : 'fiche', type:'text', text:serviceUsed?.service?.fiche},
        {name : 'coef', type:'text', text:serviceUsed?.service?.coef.toString()},
        this.enterprise
      ]
    }
  }

  private set_enterprise(entreprise?:EnterpriseObject[]):void{
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
    /*
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
    }*/
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
    /*
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
      this.serviceUsedModelService.edit_service(service, error).subscribe(
        ()=>{
          ModaleService.createTextModal("service mis à jour avec succès");
          this.ngOnInit()
        }
      );
    }
     */
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
    /*
    if (this.service_object){
      let error:EventEmitter<HttpErrorResponse>=new EventEmitter<HttpErrorResponse>();
      error.subscribe(
        ()=>
          ModaleService.createTextModal("erreur lors de la suppression du service")
      )
      this.serviceUsedModelService.delete_service(BigInt(this.service_object.id), error).subscribe(
        ()=>{
          ModaleService.createTextModal("service supprimé avec succès");
          this.router.navigateByUrl("/admin/services")
        }
      )
    }
    */
  }
}
