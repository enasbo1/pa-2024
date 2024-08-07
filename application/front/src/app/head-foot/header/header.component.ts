import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {NavLink} from "../navLink";
import {GlobalService} from "../../shared/global.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";
import {Router} from "@angular/router";
import {WpPath} from "../../shared/routes";

@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle?: string;

  navLinks : NavLink[] = [
    {
      name : "Home",
      link : WpPath.home
    }

  ];

  parts : Record<string, string> = {
    'partie-admin': '/'+WpPath.admin.root,
    'partie-prestataire': '/'+WpPath.prestate.root,
    'partie-bailleur': '/'+WpPath.bailleur.root,
    'partie-voyageur': '/'+WpPath.voyageur.root
  }

  keys : string[]=[
    'partie-admin',
    'partie-prestataire',
    'partie-bailleur',
    'partie-voyageur'
  ]

  logoUrl:string = "assets/images/logo.png";
  constructor(
    protected readonly translator:TranslatorService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  is_part(path:string):boolean{
    const path_cut = path.split('/')
    const current_cut = document.location.pathname.split('/')
    for (let i=0; i<path_cut.length; ++i) {
      if (path_cut[i]!==current_cut[i+1]){
        return false;
      }
    }
    return true;
  }

  change_part(value:string):void{
    this.router.navigateByUrl(this.parts[value]).then();
  }

  link(path:string){
    this.router.navigateByUrl(path).then();
  }

  protected readonly GlobalService = GlobalService;
  protected readonly WpPath= WpPath;
}
