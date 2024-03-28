import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home_page', component:HomeComponent},
      {path:'**', redirectTo:'home_page', pathMatch:'full'}
    ]),
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
