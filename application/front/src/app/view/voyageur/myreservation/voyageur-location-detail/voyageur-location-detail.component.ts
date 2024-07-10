import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApartmentModelService} from "../../../../http/model/apartment-model/apartment-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ApartmentOccupedObject} from "../../../../http/model/apartment-model/ApartmentObject";
import {FilterService} from "../../../../shared/foundation/list/filter.service";
import {DateService} from "../../../../http/shared/date.service";
import {ApartmentMapperService} from "../../../../mapper/apartment-mapper.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {ReservationModelService} from "../../../../http/model/reservation-model/reservation-model.service";
import {WpPath} from "../../../../shared/routes";

@Component({
  selector: 'pm-voyageur-location-detail',
  templateUrl: './voyageur-location-detail.component.html',
  styleUrls: ['./voyageur-location-detail.component.scss']
})
export class VoyageurLocationDetailComponent implements OnInit {
  protected apartment?: RubricObject;
  protected apartment_object?: ApartmentOccupedObject;
  protected period?: string;
  private occuped:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apartmentModelService: ApartmentModelService,
    private reservationModelService: ReservationModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Rent";

    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(query => {
        this.apartmentModelService.get_one_louable(params['id']).subscribe(apart=>
          this.set_apartment(apart[0], query['period'])
        )
      })
    })

  }

  set_apartment(apartment?:ApartmentOccupedObject, period?:string):void{
    if (apartment) {
      if (FilterService.isConforme(
        {name:'period', type:'free', value: period, choices:[]},
        { name: 'periode',
          value: apartment.occupee.map(per =>
            DateService.to_front(per.date_debut) + ' - ' + DateService.to_front(per.date_fin))}
      )) {
        this.period = period
        this.apartment_object = apartment;
        this.apartment = ApartmentMapperService.model_to_rubric(apartment, period);
      }
    }
  }

  rent():void{
    if (this.period && this.apartment_object && !this.occuped){
      const per = DateService.front_period_to_period(this.period);
      const dure:number =  per.end.diff(per.start, 'days')+1;
      const prix:number = dure * (this.apartment_object?.prix_fixe_nuit?? 1)
      this.occuped = true
      if (dure>0){
        ModaleService.createValidationModal(
          `voulez vous effectuer cette reservation de ${dure} jours, soit ${(prix)}€?`
        ).subscribe(
          (yes):void=>{
            (yes==='Oui')?
              this.reservationModelService.post_rent({
                id_appartement: this.apartment_object?.id??0,
                date_debut: DateService.to_api(per.start.toDate()),
                date_fin: DateService.to_api(per.end.toDate()),
                total_abonnement: prix,
                total_frais: 0,
                total_location:prix
              }).subscribe(val =>{
                  this.router.navigateByUrl('/'+WpPath.voyageur.home).then();
                }
              )
              :
                this.occuped = false
              ;
          }
        )
      }
      else{
        ModaleService.createTextModal(
          'erreur : la durée selectionnée est invalide'
        )
      }

    }
  }

}
