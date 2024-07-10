import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../shared/global.service";
import { TranslatorService } from "../../../shared/base-shared/translator.service";

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  public pageTitle: string = '';

  constructor(protected translator: TranslatorService) { }

  ngOnInit() {
    GlobalService.pageName = "Home";  // Définir le nom de la page
    this.pageTitle = GlobalService.pageName;  // Utiliser le nom de la page comme titre
  }
}
