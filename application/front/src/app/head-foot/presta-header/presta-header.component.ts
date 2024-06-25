import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NavLink} from "../navLink";
import {WpPath} from "../../shared/routes";

@Component({
  selector: 'pm-presta-header',
  templateUrl: '../header/header.component.html',
  styleUrls: [
    '../header/header.component.scss',
    './presta-header.component.scss'
  ]
})
export class PrestaHeaderComponent extends HeaderComponent {

  override navLinks: NavLink[] = [
    {
      name: "Home",
      link: WpPath.prestate.home
    },
    {
      name: "Services",
      link: WpPath.prestate.services
    },
  ];
}
