import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from '../exemple/home/welcome.component';
import {ConnectionComponent} from '../connection/connection.component';
import {DiconnectionComponent} from '../diconnection/diconnection.component';
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import {ServiceModule} from "./service/service.module";
import { LocationModule } from './location/location.module';
import {UserModule} from "./user/user.module";
import {WpPath} from "../../shared/routes";





@NgModule({
  imports: [
    LocationModule,
    CommonModule,
    ServiceModule,
    SharedModule,
    UserModule,
    RouterModule.forChild([
        { path: WpPath.admin.home, component: WelcomeComponent},
        { path: WpPath.admin.chatbot, component: ToBeImplementedComponent},
        { path: WpPath.admin.tickets, component: ToBeImplementedComponent},
        { path: WpPath.admin.root, redirectTo: WpPath.admin.home, pathMatch: 'full'},
        { path: WpPath.admin.root2, redirectTo: WpPath.admin.home, pathMatch: 'full'}
      ]
    )
  ]
})
export class AdminModule { }
