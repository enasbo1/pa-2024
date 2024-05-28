import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";
import {ActivatedRoute} from "@angular/router";
import {UserObject} from "../../../../http/model/user-model/userObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {SanctionModelService} from "../../../../http/model/sanction-model/sanction-model.service";

@Component({
  selector: 'pm-user-sanction',
  templateUrl: './user-sanction.component.html',
  styleUrls: ['./user-sanction.component.scss']
})
export class UserSanctionComponent implements OnInit {
  user?:UserObject;

  constructor(
    private route : ActivatedRoute,
    private userModelService : UserModelService,
    private sanctionModelService : SanctionModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName='Sanctionner : utilisateur';
    this.route.params.subscribe((params)=>{
        this.userModelService.get_one_user(params["id"]).subscribe((users:UserObject[]):void=>{
            this.user=users[0];
            GlobalService.pageName='Sanctionner : '+UserMapperService.get_U_Name(this.user)
          }
        );
      }
    )
  }
}
