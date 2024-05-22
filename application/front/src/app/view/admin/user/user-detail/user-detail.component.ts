import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {UserObject} from "../../../../http/model/user-model/userObject";
import {GlobalService} from "../../../../shared/global.service";
import { RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "../../../../mapper/user-mapper.service";

@Component({
  selector: 'pm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user_rubric?: RubricObject;

  protected user?:UserObject;
  constructor(
    private route :ActivatedRoute,
    private userModelService: UserModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Utilisateur";
    this.route.params.subscribe(
      (params)=>{
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
}
