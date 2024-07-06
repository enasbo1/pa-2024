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
import {ReservationModelService} from "../../../../http/model/reservation-model/reservation-model.service";
import {ReservationObject} from "../../../../http/model/reservation-model/ReservationObject";
import {ReservationMapperService} from "../../../../mapper/reservation-mapper.service";

@Component({
  selector: 'pm-detail-location',
  templateUrl: './detail-location.component.html',
  styleUrls: ['./detail-location.component.scss']
})
export class DetailLocationComponent implements OnInit {
  location_rendu:string  = '/admin/service_rendu';
  query_params?:Params;

  chat:ChatObject[] = [];
  target ?: ChatTarget;

  private enterprise:RubricElement =
    {name:'entreprise', text:'none', type:'text'};

  location_object?:ReservationObject;

  location?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private reservationModelService : ReservationModelService,
              private messageModelService : MessageModelService,
              private route: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Prestation";
    this.route.params.subscribe((params:Params) => {
      this.reservationModelService.get_one_reservation(params['id']).subscribe(
        (res:ReservationObject[])=>{
          this.set_reservation(res[0]?res[0]:undefined);
          this.target = {subject: 'reservation', id : params['id']}
        }
      );
      this.messageModelService.get_messages_from_reservation(params['id']).subscribe(
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

  private set_reservation(location?:ReservationObject):void{
    this.location_object = location;
    this.location = ReservationMapperService.model_to_rubric(location);
  }

  public openDeleteModal():void{
    if (this.location_object){
      ModaleService.createValidationModal('voulez-vous vraiment supprimer cette reservation ?').subscribe(
        (value)=>
          (value==="Oui")?this.delete():0
      )
    }
  }

  private delete():void{
    if (this.location_object){
      let error:EventEmitter<HttpErrorResponse>=new EventEmitter<HttpErrorResponse>();
      error.subscribe(
        ()=>
          ModaleService.createTextModal("erreur lors de la suppression de la reservation")
      )
      this.reservationModelService.delete_reservation(BigInt(this.location_object.id?? 0), error).subscribe(
        ()=>{
          ModaleService.createTextModal("reservation supprimé avec succès");
          this.router.navigateByUrl(WpPath.admin.services.presta)
        }
      )
    }
  }
}
