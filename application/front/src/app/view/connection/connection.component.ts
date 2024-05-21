import { Component, OnInit } from '@angular/core';
import {FormFieldObject} from "../../shared/base-shared/form-field/formFieldObject";
import { FormStepObject } from "../../shared/base-shared/form-step/formStepObject";
import {ConnectionService} from "../../http/shared/connection.service";
import {TranslatorService} from "../../shared/base-shared/translator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pm-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  error?:string;
  private nextstep:()=>void = ()=>0;

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
    public translator:TranslatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fail(message:string|undefined):void{
    this.error = message?message:"email or password invalid";
  }

  connection_error():void{
    this.error = "connection api failed"
  }

  verify(nextstep:()=>void, step:number):void{
    this.error = "...";
    this.nextstep = nextstep;
    this.connectionService.connect(
      this.items[step].content[0].content,
      (yes:boolean, error:string|undefined):void=>yes?this.validated():this.fail(error),
      ()=>this.connection_error())
  }

  submit(values:FormFieldObject[]) : void {
    this.values = values;
    this.router.navigate([""],{queryParams:{message:"utilisateur connecté"}});

  }

  private validated(){
    this.nextstep();
    this.error = undefined
  }
}
