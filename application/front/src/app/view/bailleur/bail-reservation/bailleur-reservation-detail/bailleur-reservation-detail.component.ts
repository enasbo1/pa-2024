import {Component, EventEmitter, OnInit} from '@angular/core';
import {ChatObject} from "../../../../shared/foundation/chat/chatObject";
import {ChatTarget} from "../../../../shared/foundation/chat/chat.component";
import {RubricElement, RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ReservationObject} from "../../../../http/model/reservation-model/ReservationObject";
import {ReservationModelService} from "../../../../http/model/reservation-model/reservation-model.service";
import {MessageModelService} from "../../../../http/model/message-model/message-model.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GlobalService} from "../../../../shared/global.service";
import {MessageMapperService} from "../../../../mapper/message-mapper.service";
import {ReservationMapperService} from "../../../../mapper/reservation-mapper.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {HttpErrorResponse} from "@angular/common/http";
import {WpPath} from "../../../../shared/routes";
import {DateService} from "../../../../http/shared/date.service";

@Component({
  selector: 'pm-bailleur-reservation-detail',
  templateUrl: './bailleur-reservation-detail.component.html',
  styleUrls: ['./bailleur-reservation-detail.component.scss']
})
export class BailleurReservationDetailComponent implements OnInit {
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
    GlobalService.pageName = "Reservation";
    this.route.params.subscribe((params:Params) => {
      this.reservationModelService.get_one_reservation_from_voy(params['id']).subscribe(
        (res:ReservationObject[])=>{
          this.set_reservation(res[0]?res[0]:undefined);
          this.target = {subject: 'reservation', id : params['id']}
        }
      );
      this.messageModelService.get_messages_from_reservation(params['id']).subscribe(
        (messages)=>{
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

  public openValidationModal():void{
    if (this.location_object){
      ModaleService.createValidationModal('voulez-vous vraiment valider cette reservation ?').subscribe(
        (value)=>
          (value==="Oui")?this.valid():0
      )
    }
  }

  private valid():void{
    if (this.location_object){
      let error:EventEmitter<HttpErrorResponse>=new EventEmitter<HttpErrorResponse>();
      error.subscribe(
        ()=>
          ModaleService.createTextModal("erreur lors de la validation de la reservation")
      )
      this.reservationModelService.valid_reservation(this.location_object.id?? 0, error).subscribe(
        ()=>{
          ModaleService.createTextModal("reservation validée avec succès");
          this.messageModelService.post_message(
            {
              texte: '*La Reservation a été validée*',
              date_envoie: DateService.to_api(),
              id_RESERVATION: this.location_object?.id??0
            },
          ).subscribe()
        }
      )
    }
  }
}
