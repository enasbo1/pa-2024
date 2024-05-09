import {Component, Input, OnInit} from '@angular/core';
import {NavLink} from "../navLink";
import {GlobalService} from "../../shared/global.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string = "";
  navLinks : NavLink[] = [
    {
      name : "Home",
      link : "/welcome"
    },
    {
      name : "Product",
      link : "/products"
    },
    {
      name : "Generic",
      link : "/generic"
    },

  ];

  logoUrl:string = "assets/images/hammer.png";
  constructor(protected readonly translator:TranslatorService) { }

  ngOnInit(): void {
  }

  protected readonly GlobalService = GlobalService;
}
