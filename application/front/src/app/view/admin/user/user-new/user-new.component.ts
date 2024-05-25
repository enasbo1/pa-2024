import {Component, EventEmitter, OnInit} from '@angular/core';
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {GlobalService} from "../../../../shared/global.service";
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {UserObject} from "../../../../http/model/user-model/userObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {TranslatorService} from "../../../../shared/base-shared/translator.service";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {WpPath} from "../../../../shared/routes";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'pm-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./../user-edit/user-edit.component.scss']
})
export class UserNewComponent implements OnInit {
  user_form:FormStepObject[] = UserMapperService.model_to_form();
  error?:string;
  constructor(
    private userModelService:UserModelService,
    protected translator:TranslatorService,
    private router : Router
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
    ModaleService.createValidationModal('voulez-vous vraiment ajouter cet utilisateur ?')
      .subscribe(
        (value) => {
          if (value === "Oui") {
            const user: UserObject = UserMapperService.form_to_model(values);
            const error:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()
            error.subscribe(
              (error:HttpErrorResponse)=>this.error='400 formulaire invalide'
            )

            this.userModelService.post_user(user).subscribe(
              ()=>
                this.router.navigateByUrl(WpPath.admin.users.root).then()
            );
          }
        }
      );
  }
}
