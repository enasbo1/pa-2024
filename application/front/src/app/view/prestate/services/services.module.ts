import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestateServicesComponent } from './prestate-services/prestate-services.component';
import {FoundationModule} from "../../../shared/foundation/foundation.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";
import { NewPrestateServiceComponent } from './new-prestate-service/new-prestate-service.component';
import { PrestateServiceDetailComponent } from './prestate-service-detail/prestate-service-detail.component';
import {BaseSharedModule} from "../../../shared/base-shared/base-shared.module";
import { PrestateServiceFormComponent } from './prestate-service-form/prestate-service-form.component';



@NgModule({
  declarations: [
    PrestateServicesComponent,
    NewPrestateServiceComponent,
    PrestateServiceDetailComponent,
    PrestateServiceFormComponent
  ],
  imports: [
    CommonModule,
    FoundationModule,
    RouterModule.forChild([
      {path: WpPath.prestate.services.root, component: PrestateServicesComponent},
      {path: WpPath.prestate.services.new, component: NewPrestateServiceComponent},
      {path: WpPath.prestate.services.form, component: PrestateServiceFormComponent},
      {path: WpPath.prestate.services.edit, component: PrestateServiceDetailComponent}
    ]),
    BaseSharedModule
  ]
})
export class ServicesModule { }
