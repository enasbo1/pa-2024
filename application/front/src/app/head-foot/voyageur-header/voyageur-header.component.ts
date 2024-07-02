import { Component, OnInit,Input } from '@angular/core';
import {NavLink} from "../navLink";
import {WpPath} from "../../shared/routes";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'pm-voyageur-header',
  templateUrl: '../header/header.component.html',
  styleUrls: [
      './voyageur-header.component.scss',
    './../header/header.component.scss'
  ]
})
export class VoyageurHeaderComponent extends HeaderComponent{

  override navLinks : NavLink[] = [
    {
      name : "Home",
      link : WpPath.voyageur.home
    },
    {
      name : "My Reservations",
      link : WpPath.voyageur.myReservation
    },
    {
      name : "My Services",
      link : WpPath.voyageur.myServices
    },
  ];
}
