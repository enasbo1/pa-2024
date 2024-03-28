import { Component, OnInit, Input} from '@angular/core';
import {NavLink} from "../navLink";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'pm-admin-header',
  templateUrl: '../header/header.component.html',
  styleUrls: [
    './admin-header.component.scss',
    '../header/header.component.scss'
  ]
})
export class AdminHeaderComponent extends HeaderComponent{

  override ngOnInit() {
    super.ngOnInit();
    this.navLinks.push({
      name:"Admin",
      link:"admin"
    })
  }
}
