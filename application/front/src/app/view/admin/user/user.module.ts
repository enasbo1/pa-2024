import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {UserGestionComponent} from './user-gestion/user-gestion.component';
import {SharedModule} from "../../../shared/shared.module";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {WpPath} from "../../../shared/routes";
import {ToBeImplementedComponent} from "../../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { UserNewComponent } from './user-new/user-new.component';



@NgModule({
  declarations: [
    UserGestionComponent,
    UserDetailComponent,
    UserNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: WpPath.admin.users.new, component: UserNewComponent},
      {path: WpPath.admin.users.detail, component: UserDetailComponent},
      {path: WpPath.admin.users.root, component: UserGestionComponent}
    ]),
  ]
})
export class UserModule { }
