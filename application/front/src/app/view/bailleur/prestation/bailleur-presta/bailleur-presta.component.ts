import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChatObject} from "../../../../shared/foundation/chat/chatObject";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";
import {RubricElement, RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ServiceUsedObject} from "../../../../http/model/service-used-model/serviceUsedObject";
import {ServiceUsedModelService} from "../../../../http/model/service-used-model/service-used-model.service";
import {MessageModelService} from "../../../../http/model/message-model/message-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {MessageMapperService} from "../../../../mapper/message-mapper.service";
import {PrestaMapperService} from "../../../../mapper/presta-mapper.service";
import {EnterpriseObject} from "../../../../http/model/enterprise-model/enterpriseObject";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {DateService} from "../../../../http/shared/date.service";
import {HttpErrorResponse} from "@angular/common/http";
import {WpPath} from "../../../../shared/routes";

@Component({
  selector: 'pm-bailleur-presta',
  templateUrl: './bailleur-presta.component.html',
  styleUrls: ['./bailleur-presta.component.scss']
})
export class BailleurPrestaComponent implements OnInit {
  service_rendu:string  = '/admin/service_rendu';
  query_params?:Params;

  chat:ChatObject[] = [];
  target ?: ChatTarget;

  private enterprise:RubricElement =
    {name:'entreprise', text:'none', type:'text'};

  service_object?:ServiceUsedObject;

  service?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private serviceUsedModelService : ServiceUsedModelService,
              private messageModelService : MessageModelService,
              private route: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Prestation";
    this.route.params.subscribe((params:Params) => {
      this.serviceUsedModelService.get_one_serviceUsed(params['id']).subscribe(
        (service:ServiceUsedObject[])=>{
          this.set_services(service[0]?service[0]:undefined);
          this.target = {subject: 'prestation', id : params['id']}
        }
      );
      this.messageModelService.get_messages_from_prestation(params['id']).subscribe(
        (messages)=>{
          console.log(messages.map(
            (m)=>
              MessageMapperService.model_to_chat(m)));
          this.chat = messages.map(
            (m)=>
              MessageMapperService.model_to_chat(m)
          );
        }
      )
    });
  }

  private set_services(serviceUsed?:ServiceUsedObject):void{
    this.service_object = serviceUsed;
    if (serviceUsed?.entreprise){
      this.set_enterprise([serviceUsed?.entreprise])
    }
    this.service = PrestaMapperService.model_to_rubric(serviceUsed);
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

  public openDeleteModal():void{
    if (this.service_object){
      ModaleService.createValidationModal('voulez-vous vraiment supprimer ce service ?').subscribe(
        (value)=>
          (value==="Oui")?this.delete():0
      )
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
      this.serviceUsedModelService.delete_usedService(BigInt(this.service_object.id), error).subscribe(
        ()=>{
          ModaleService.createTextModal("service supprimé avec succès");
          this.router.navigateByUrl(WpPath.admin.services.presta)
        }
      )
    }
  }
}
