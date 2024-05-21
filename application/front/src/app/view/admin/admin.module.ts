import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from '../../home/welcome.component';
import {ConnectionComponent} from '../connection/connection.component';
import {DiconnectionComponent} from '../diconnection/diconnection.component';
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import {ServiceModule} from "./service/service.module";
import { LocationModule } from './location/location.module';
import {UserModule} from "./user/user.module";





@NgModule({
  imports: [
    LocationModule,
    CommonModule,
    ServiceModule,
    SharedModule,
    UserModule,
    RouterModule.forChild([
        { path: 'admin/home', component: WelcomeComponent},
        { path: 'admin/connection', component: ConnectionComponent},
        { path: 'admin/disconnection', component: DiconnectionComponent},
        { path: 'admin/users', component: ToBeImplementedComponent},
        { path: 'admin/location', component: ToBeImplementedComponent},
        { path: 'admin/chatbot', component: ToBeImplementedComponent},
        { path: 'admin/tickets', component: ToBeImplementedComponent},
        { path: 'admin', redirectTo: 'admin/home', pathMatch: 'full'},
        { path: 'admin/', redirectTo: 'admin/home', pathMatch: 'full'}
      ]
    )
  ]
})
export class AdminModule { }
