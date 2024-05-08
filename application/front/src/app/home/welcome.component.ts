import { Component } from '@angular/core';
import {GlobalService} from "../shared/global.service";
import {TranslatorService} from "../shared/base-shared/translator.service";

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
  protected readonly GlobalService = GlobalService;

  constructor(protected translator:TranslatorService) {
  }

}
