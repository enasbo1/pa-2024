import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenListComponent } from './gen-list/genList.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { GenDropdownComponent } from './gen-dropdown/gen-dropdown.component';
import { GenModaleComponent } from './gen-modale/gen-modale.component';
import { GenInfoBandComponent } from './gen-info-band/gen-info-band.component';
import { GenRubricComponent } from './gen-rubric/gen-rubric.component';



@NgModule({
  declarations: [
    GenListComponent,
    GenDropdownComponent,
    GenModaleComponent,
    GenInfoBandComponent,
    GenRubricComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'generic/rubric', component: GenRubricComponent},
      { path: 'generic/accueil', component: GenInfoBandComponent},
      { path: 'generic/modale', component: GenModaleComponent},
      { path: 'generic/dropdown', component: GenDropdownComponent},
      { path: 'generic/list', component: GenListComponent},
      { path: 'generic', redirectTo:"generic/list", pathMatch:"full"},
    ])
  ],
})
export class GenericModule { }
