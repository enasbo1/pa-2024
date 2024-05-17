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
  override navLinks : NavLink[] = [
    {
      name : "Home",
      link : "/admin/welcome"
    },
    {
      name : "Utilisateurs",
      link : "admin/users"
    },
    {
      name : "Locations",
      link : "/admin/location"
    },
    {
      name : "Services",
      link : "/admin/services"
    },
    {
      name : "Chatbot",
      link : "/admin/chatbot"
    },
    {
      name : "Tickets",
      link : "/admin/tickets"
    },

  ];
}
