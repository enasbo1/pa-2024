import { Component, OnInit } from '@angular/core';
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {UserModelService} from "../../../../http/model/user-model/user-model.service";

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

  private detailPage:string = "/admin/users";
  constructor(private userModelService : UserModelService) { }

  ngOnInit(): void {
    this.userModelService.get_user().subscribe((
      users)=>
      this.setUser(
        users.map((user)=>
          this.userModelService.user_to_list(user, this.detailPage))
      )
    )
  }

  private setUser(user:ListObject[]):void{
    this.users = user
  }

}
