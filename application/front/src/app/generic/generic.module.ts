import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenListComponent } from './gen-list/genList.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    GenListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'generic/list', component: GenListComponent},
      { path: 'generic', redirectTo:"generic/list", pathMatch:"full"},
    ])
  ],
})
export class GenericModule { }
