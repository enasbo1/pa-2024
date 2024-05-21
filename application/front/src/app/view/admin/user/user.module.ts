import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UserGestionComponent} from './user-gestion/user-gestion.component';
import {SharedModule} from "../../../shared/shared.module";
import { UserDetailComponent } from './user-detail/user-detail.component';



@NgModule({
  declarations: [
    UserGestionComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/users', component: UserGestionComponent},
      {path: 'admin/users/:id', component: UserDetailComponent}
    ]),
  ]
})
export class UserModule { }
