import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToBeImplementedComponent } from 'src/app/shared/foundation/to-be-implemented/to-be-implemented.component';
import { GestionLocationComponent } from './gestion-location/gestion-location.component';



@NgModule({
  declarations: [
    GestionLocationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/location/:id', component: ToBeImplementedComponent},
      {path: 'admin/location', component: GestionLocationComponent}
    ])

  ]
})
export class LocationModule { }
