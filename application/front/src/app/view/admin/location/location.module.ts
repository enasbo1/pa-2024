import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToBeImplementedComponent } from 'src/app/shared/foundation/to-be-implemented/to-be-implemented.component';
import { GestionLocationComponent } from './gestion-location/gestion-location.component';
import {WpPath} from "../../../shared/routes";
import { DetailLocationComponent } from './detail-location/detail-location.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';



@NgModule({
  declarations: [
    GestionLocationComponent,
    DetailLocationComponent,
    ApartmentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: WpPath.admin.apartment.detail, component: ApartmentDetailComponent},
      {path: WpPath.admin.location.detail, component: DetailLocationComponent},
      {path: WpPath.admin.location.root, component: GestionLocationComponent}
    ])

  ]
})
export class LocationModule { }
