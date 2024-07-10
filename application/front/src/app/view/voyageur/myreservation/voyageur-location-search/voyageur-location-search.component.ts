import {Component, EventEmitter, OnInit} from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {GlobalService} from "../../../../shared/global.service";
import {ApartmentModelService} from "../../../../http/model/apartment-model/apartment-model.service";
import {ApartmentMapperService} from "../../../../mapper/apartment-mapper.service";
import {ApartmentObject} from "../../../../http/model/apartment-model/ApartmentObject";
import {ListComponent} from "../../../../shared/foundation/list/list.component";
import {WpPath} from "../../../../shared/routes";
import {Params} from "@angular/router";

@Component({
  selector: 'pm-voyageur-location-search',
  templateUrl: './voyageur-location-search.component.html',
  styleUrls: ['./voyageur-location-search.component.scss']
})
export class VoyageurLocationSearchComponent implements OnInit {
  apartments: ListObject[] = [];
  period:string = '';
  queryParams:Params = {period:''};
  filters: FilterObject[] = [
  ];
  critera: string[] = [
    'description',
    'number'
  ];

  constructor(
    private apartmentService: ApartmentModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Location";

    const up_period = new EventEmitter<string>();
    this.filters=    [
      { name: 'ville', type: 'auto' },
      { name: 'code_postal', type: 'auto' },
      { name: 'periode', type: 'free', upwarp: up_period,
        required_act: {
            text:'pas de période selectionée',
            clickable_text:'sélectionner une periode',
            play():void{
              if (this.target){
                ListComponent.setPeriod(this.target)
              }
            }
          }
        },
      { name: 'type_de_bien', type: 'auto' },
      { name: 'prix_fixe_nuit', type: 'auto' }
    ]
    this.apartmentService.get_louables().subscribe((apartments:ApartmentObject[]) =>
      this.set_apartments(
        apartments.map((apartment:ApartmentObject) =>{
            return ApartmentMapperService.model_to_list(apartment, '/'+WpPath.voyageur.searchLocation.detail);
          }
        )
      )
    );

    up_period.subscribe(
      per => {
        this.queryParams = {period: per}
      }
    )
  }

  private set_apartments(apartments: ListObject[]): void {
    this.apartments = apartments;
  }
}
