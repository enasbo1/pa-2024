import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UserGestionComponent} from './user-gestion/user-gestion.component';
import {SharedModule} from "../../../shared/shared.module";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {WpPath} from "../../../shared/routes";
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';



@NgModule({
  declarations: [
    UserGestionComponent,
    UserDetailComponent,
    UserNewComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: WpPath.admin.users.new, component: UserNewComponent},
      {path: WpPath.admin.users.edit, component: UserEditComponent},
      {path: WpPath.admin.users.detail, component: UserDetailComponent},
      {path: WpPath.admin.users.root, component: UserGestionComponent}
    ]),
  ]
})
export class UserModule { }
