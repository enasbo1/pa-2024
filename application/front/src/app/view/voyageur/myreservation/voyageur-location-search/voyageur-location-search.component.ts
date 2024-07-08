import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {GlobalService} from "../../../../shared/global.service";
import {ApartmentModelService} from "../../../../http/model/apartment-model/apartment-model.service";
import {ApartmentMapperService} from "../../../../mapper/apartment-mapper.service";
import {ApartmentObject} from "../../../../http/model/apartment-model/ApartmentObject";

@Component({
  selector: 'pm-voyageur-location-search',
  templateUrl: './voyageur-location-search.component.html',
  styleUrls: ['./voyageur-location-search.component.scss']
})
export class VoyageurLocationSearchComponent implements OnInit {
  apartments: ListObject[] = [];
  filters: FilterObject[] = [
    { name: 'ville', type: 'auto' },
    { name: 'code_postal', type: 'auto' },
    { name: 'type_de_bien', type: 'auto' },
    { name: 'prix_fixe_nuit', type: 'auto' },
    { name: 'periode', type: 'free' },

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

    this.apartmentService.get_louables().subscribe((apartments:ApartmentObject[]) =>
      this.set_apartments(
        // TODO comprendre pourquoi le filtre ne fonctionne pas bien
        apartments.map((apartment:ApartmentObject) =>{
            console.log(ApartmentMapperService.model_to_list(apartment));
            return ApartmentMapperService.model_to_list(apartment)
          }
        )
      )
    );
  }

  private set_apartments(apartments: ListObject[]): void {
    this.apartments = apartments;
  }
}
