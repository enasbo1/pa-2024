import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DisplaySmthComponent } from './new-page/display-smth.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

@NgModule({
  declarations: [ // witch component you need from this module
    AppComponent,
    WelcomeComponent,
    DisplaySmthComponent,
  ],
  imports: [ // witch others modules you need
    BrowserModule,
    HttpClientModule,
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
