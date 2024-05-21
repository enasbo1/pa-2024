import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {UserObject} from "../../../../http/model/user-model/userObject";

@Component({
  selector: 'pm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  private user?: UserObject;
  constructor(
    private route :ActivatedRoute,
    private userModelService: UserModelService
  ) { }

  ngOnInit(): void {
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
    this.user = user
  }
}
