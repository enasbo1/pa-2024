import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {GlobalService} from "../../../../shared/global.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {HttpErrorResponse} from "@angular/common/http";
import {WpPath} from "../../../../shared/routes";
import {ApartmentModelService} from "../../../../http/model/apartment-model/apartment-model.service";
import {ApartmentObject} from "../../../../http/model/apartment-model/ApartmentObject";
import {ApartmentMapperService} from "../../../../mapper/apartment-mapper.service";

@Component({
  selector: 'pm-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss']
})
export class ApartmentDetailComponent implements OnInit {
  apartment_object?:ApartmentObject;

  apartment?:RubricObject= {
    title : 'waiting for the serv to answer',
    content:[]
  }

  constructor(private apartmentModelService : ApartmentModelService,
              private route: ActivatedRoute,
              private router:Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Location";
    this.route.params.subscribe((params:Params) => {
      this.apartmentModelService.get_one_apartment(params['id']).subscribe(
        (res:ApartmentObject[])=>{
          this.set_apartment(res[0]?? undefined);
        }
      );
    });
  }

  private set_apartment(apartment?:ApartmentObject):void{
    this.apartment_object = apartment;
    this.apartment = ApartmentMapperService.model_to_rubric(apartment);
  }

  public openDeleteModal():void{
    if (this.apartment_object){
      ModaleService.createValidationModal('voulez-vous vraiment supprimer cette reservation ?').subscribe(
        (value)=>
          (value==="Oui")?this.delete():0
      )
    }
  }

  private delete():void{
    if (this.apartment_object){
      let error:EventEmitter<HttpErrorResponse>=new EventEmitter<HttpErrorResponse>();
      error.subscribe(
        ()=>
          ModaleService.createTextModal("erreur lors de la suppression de la reservation")
      )
      this.apartmentModelService.delete_apartment(this.apartment_object.id?? 0, error).subscribe(
        ()=>{
          ModaleService.createTextModal("reservation supprimé avec succès");
          this.router.navigateByUrl(WpPath.admin.services.presta)
        }
      )
    }
  }
}
