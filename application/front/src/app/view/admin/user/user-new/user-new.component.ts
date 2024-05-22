import { Component, OnInit } from '@angular/core';
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {GlobalService} from "../../../../shared/global.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";

@Component({
  selector: 'pm-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  user_form:FormStepObject[] = UserMapperService.model_to_form();
  constructor() { }

  ngOnInit(): void {
    GlobalService.pageName = "nouvel Utilisateur"
  }

}
