import {Component, Input, OnInit} from '@angular/core';
import {NavLink} from "../navLink";
import {GlobalService} from "../../shared/global.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";
import {Router} from "@angular/router";

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

  parts : Record<string, string> = {
    'partie-admin': '/admin',
    'partie-prestataire': '/prestate',
    'partie-bailleur': '/bail',
    'partie-voyageur': '/voyageur'
  }

  keys : string[]=[
    'partie-admin',
    'partie-prestataire',
    'partie-bailleur',
    'partie-voyageur'
  ]

  logoUrl:string = "assets/images/hammer.png";
  constructor(
    protected readonly translator:TranslatorService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  change_part(value:string):void{
    this.router.navigateByUrl(this.parts[value]);
  }

  protected readonly GlobalService = GlobalService;
}
