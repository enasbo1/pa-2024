import { Component, OnInit } from '@angular/core';
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";
import {UserMapperService} from "../../../../mapper/user-mapper.service";
import {WpPath} from "../../../../shared/routes";
import {GlobalService} from "../../../../shared/global.service";

@Component({
  selector: 'pm-user-gestion',
  templateUrl: './user-gestion.component.html',
  styleUrls: ['./user-gestion.component.scss']
})
export class UserGestionComponent implements OnInit {
  users:ListObject[] = []
  filters:FilterObject[] = [
    {name : 'role', type:'auto'},
    {name : 'pays', type:'auto'},
  ]
  critera : string[] = [
    'mail',
    'prenom',
    'nom'
  ];

  private detailPage:string = WpPath.admin.users.root;
  constructor(private userModelService : UserModelService) { }

  ngOnInit(): void {
    GlobalService.pageName = "Utilisateur";
    this.userModelService.get_user().subscribe((
      users)=>
      this.setUser(
        users.map((user)=>
          UserMapperService.model_to_list(user)
      )
    ))
  }

  private setUser(user:ListObject[]):void{
    this.users = user
  }

}
