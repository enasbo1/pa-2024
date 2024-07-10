import { Component, OnInit } from '@angular/core';
import {NavLink} from "../navLink";
import {WpPath} from "../../shared/routes";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'pm-bailleur-header',
  templateUrl: '../header/header.component.html',
  styleUrls: [
    '../header/header.component.scss',
    './bailleur-header.component.scss'
  ]
})
export class BailleurHeaderComponent extends HeaderComponent{

  override navLinks : NavLink[] = [
    {
      name : "Home",
      link : WpPath.bailleur.home
    },
    {
      name : "Reservation",
      link : WpPath.bailleur.reservation.root
    },
    {
      name : "Prestation",
      link : WpPath.bailleur.prestations
    },
  ];
}
