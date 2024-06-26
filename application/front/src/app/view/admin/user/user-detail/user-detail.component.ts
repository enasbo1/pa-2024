import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {UserObject} from "../../../../http/model/user-model/userObject";
import {GlobalService} from "../../../../shared/global.service";
import { RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {WpPath} from "../../../../shared/routes";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";

@Component({
  selector: 'pm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user_rubric?: RubricObject;
  protected user?:UserObject;
  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private userModelService : UserModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Utilisateur";
    this.route.params.subscribe(
      (params:Params):void=>{
        this.userModelService.get_one_user(params['id']).subscribe(
          (user)=>{
            if (user!=[]){
              this.setUser(
                user[0]
              )
            }
          }
        )
      }
    )
  }

  private setUser(user:UserObject):void{
    this.user = user;
    this.user_rubric = UserMapperService.model_to_rubric(user);
  }

  edit():void{
    if (this.user?.id){
      this.router.navigateByUrl(WpPath.admin.users.edit.replace(':id', this.user.id.toString())).then()
    }
  }

  delete():void{
    if (this.user?.id){
      ModaleService.createValidationModal(
        `voulez-vous vraiment supprimer l' utilisateur ${UserMapperService.get_U_Name(this.user)} ?`)
          .subscribe((yes)=>{
            if ((yes==='Oui') && this.user?.id){
              this.userModelService.delete_user(this.user.id).subscribe(
                ()=>
                  this.router.navigate(
                    [WpPath.admin.users.root],
                    {queryParams:{message:'utilisateur supprimé avec succès'}}
                  ).then()
              );
            }
          }
        )
    }
  }

  sanction():void{
    if (this.user?.id){
      const rubric:RubricObject={
        title : 'sanctions',
        content : [
          {name:'  -', type:"link", text:"ajouter une sanction",
            value:WpPath.admin.users.sanction.replace(':id', this.user.id.toString())}
        ]
      }
      ModaleService.createRubricModal(
        rubric
      )
    }
  }
}
