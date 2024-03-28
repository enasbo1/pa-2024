import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';
import {HeadFootModule} from "./head-foot/headFoot.module";
import {GenericModule} from "./generic/generic.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [ // witch component you need from this module
    AppComponent,
    WelcomeComponent,
  ],
  imports: [ // witch others modules you need
    BrowserModule,
    HttpClientModule,
    GenericModule,
    SharedModule,
    HeadFootModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    ProductModule
  ],
  bootstrap: [ // the starters components (or mains components)
    AppComponent
  ],
  exports: [ // witch elements and modules other modules needs from you,
             // /!\ export are inherited by export but NOT BY IMPORT
    //...
  ]
})
export class AppModule { }
