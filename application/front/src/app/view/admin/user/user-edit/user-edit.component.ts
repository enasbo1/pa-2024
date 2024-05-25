import { Component, OnInit } from '@angular/core';
import {FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {TranslatorService} from "../../../../shared/base-shared/translator.service";
import {GlobalService} from "../../../../shared/global.service";
import {FormFieldObject} from "../../../../shared/base-shared/form-field/formFieldObject";
import {UserObject} from "../../../../http/model/user-model/userObject";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {WpPath} from "../../../../shared/routes";

@Component({
  selector: 'pm-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user_form?:FormStepObject[];
  private user?:UserObject;
  error?:string;
  constructor(
    private userModelService:UserModelService,
    protected translator:TranslatorService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "modifier l'Utilisateur";
    this.route.params.subscribe((param:Params)=>{
        this.userModelService.get_one_user(param['id']).subscribe(
          (users:UserObject[])=> {
            this.user = users[0];
            this.user_form = UserMapperService.model_to_form(users[0]);
            this.user_form.forEach((step)=>
              step.errorEvent?.subscribe(
                (error)=> this.error = error
              )
            )
          }
        )
      }
    )
  }

  submit(values:FormFieldObject[]):void {
    ModaleService.createValidationModal('voulez-vous vraiment modifier cet utilisateur ?')
      .subscribe(
        (value) => {
          if (value === "Oui") {
            let user: UserObject = UserMapperService.form_to_model(values);
            user.id = <bigint>this.user?.id

            this.userModelService.update_user(user).subscribe();
            this.router.navigateByUrl(WpPath.admin.users.detail.replace(':id', user.id?.toString())).then()
          }
        }
      );
  }
}
