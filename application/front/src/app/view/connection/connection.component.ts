import { Component, OnInit } from '@angular/core';
import {FormFieldObject} from "../../shared/base-shared/form-field/formFieldObject";
import { FormStepObject } from "../../shared/base-shared/form-step/formStepObject";
import {ConnectionService} from "../../connection/connection.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";

@Component({
  selector: 'pm-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  error?:string;
  items:FormStepObject[]=[
    {
      title:"connection",
      validator:(nextstep:()=>void, step:number)=>this.verify(nextstep, step),
      content:[
        {
          content:[
            {name:"mail", title: "email",type:"email", instruction:"your email", placeholder:"wandermail@mail.vo"},
            {name:"password",title:"password", type:"password", instruction:"your password", placeholder:"*******"}
          ]
        }
      ]
    }
  ];

  values?:FormFieldObject[]
  constructor(
    private connectionService:ConnectionService,
    public translator:TranslatorService
  ) { }

  ngOnInit(): void {
  }

  fail():void{
    this.error = "invalid values";
  }

  verify(nextstep:()=>void, step:number):void{
    this.connectionService.connect(
      this.items[step].content[0].content,
      (yes:boolean)=>yes?nextstep():this.fail());
  }

  submit(values:FormFieldObject[]) : void {
    this.values = values;
  }
}
