import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from '../../home/welcome.component';
import {ConnectionComponent} from '../connection/connection.component';
import {DiconnectionComponent} from '../diconnection/diconnection.component';
import {ToBeImplementedComponent} from "../../shared/foundation/to-be-implemented/to-be-implemented.component";
import {ServiceModule} from "./service/service.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceModule,
    SharedModule,
    RouterModule.forChild([
        { path: 'admin/welcome', component: WelcomeComponent},
        { path: 'admin/connection', component: ConnectionComponent},
        { path: 'admin/disconnection', component: DiconnectionComponent},
        { path: 'admin/users', component: ToBeImplementedComponent},
        { path: 'admin/location', component: ToBeImplementedComponent},
        { path: 'admin/chatbot', component: ToBeImplementedComponent},
        { path: 'admin/tickets', component: ToBeImplementedComponent},
        { path: 'admin', redirectTo: 'admin/welcome', pathMatch: 'full'},
        { path: 'admin/', redirectTo: 'admin/welcome', pathMatch: 'full'}
      ]
    )
  ]
})
export class AdminModule { }
