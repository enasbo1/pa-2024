import { Component, OnInit, Input} from '@angular/core';
import {NavLink} from "../navLink";
import {HeaderComponent} from "../header/header.component";
import {WpPath} from "../../shared/routes";

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
      link : WpPath.admin.home
    },
    {
      name : "Utilisateurs",
      link : WpPath.admin.users.root
    },
    {
      name : "Locations",
      link : WpPath.admin.location.root
    },
    {
      name : "Services",
      link : WpPath.admin.services.root
    },
    {
      name : "Chatbot",
      link : WpPath.admin.chatbot
    },
    {
      name : "Tickets",
      link : WpPath.admin.tickets
    },

  ];
}
