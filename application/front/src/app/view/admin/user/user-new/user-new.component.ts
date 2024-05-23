import { Component, OnInit } from '@angular/core';
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {GlobalService} from "../../../../shared/global.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {UserObject} from "../../../../http/model/user-model/userObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {TranslatorService} from "../../../../shared/base-shared/translator.service";

@Component({
  selector: 'pm-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  user_form:FormStepObject[] = UserMapperService.model_to_form();
  error?:string;
  constructor(
    private userModelService:UserModelService,
    protected translator:TranslatorService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "nouvel Utilisateur"
    for (const userFormElement of this.user_form) {
      userFormElement.errorEvent?.subscribe(
        (error)=>this.error=error
      )
    }
  }

  submit(values:FormFieldObject[]):void{
    let user:UserObject = UserMapperService.form_to_model(values);
    console.log(user);
    this.userModelService.post_user(user);
  }

}
