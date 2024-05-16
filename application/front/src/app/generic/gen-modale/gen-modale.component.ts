import {Component, EventEmitter, OnInit} from '@angular/core';
import {GlobalService} from "../../shared/global.service";
import {ModalObject} from "../../shared/foundation/modale/modalObject";
import {FormFieldObject} from "../../shared/base-shared/form-field/formFieldObject";
import {RubricObject} from "../../shared/base-shared/rubric/rubricObject";

@Component({
  selector: 'pm-gen-modale',
  templateUrl: './gen-modale.component.html',
  styleUrls: ['./gen-modale.component.scss']
})
export class GenModaleComponent implements OnInit {
  private TEXT_MODAL_SUBMIT:EventEmitter<any> = new EventEmitter<any>()
  private TEXT_MODAL:ModalObject = {
    visible:true,
    options:[
      {
        name: "quitter",
        end : true,
        action:this.TEXT_MODAL_SUBMIT
      }
    ],
    content:{
      type:"text",
      text:"coucou",
    }
  }

  private FORM_MODAL_SUMBIT:EventEmitter<FormFieldObject[]> = new EventEmitter<FormFieldObject[]>();
  private FORM_MODAL:ModalObject = {
    visible:true,
    options:[
    ],
    content:{
      type:"form",
      form:{
        fields:{
          title:'coucou',
          content:[{
            content:[
              {
                name:'nom',
                type:'text',
                title:'nom'
              },
              {
                name:'sexe',
                type:'dropdown',
                choices:['homme', 'femme']
              },
              {
                name:'file',
                type:'file',
                title:'file'
              }
            ]
          }]
        },
        submit:this.FORM_MODAL_SUMBIT
      }
    }
  }

  private RUBRIC:RubricObject = {
    title:"Rubric Modal",
    content:[
      {type:'text', name:'nom', text:'unknown'},
      {type:'text', name:'sexe', text:'unknown'}
    ]
  };
  private RUBRIC_MODAL:ModalObject = {
    visible:true,
    options:[
      {
        name: "quitter",
        end : true,
      }
    ],
    content:{
      type:"rubric",
      rubric:this.RUBRIC
    }
  }

  private IMAGE_MODAL:ModalObject = {
    visible:true,
    options:[
      {
        name: "quitter",
        end : true,
      }
    ],
    content:{
      type:"image",
      image:'assets/images/logo.png'
    }
  }

  text:string = "";
  private num:number=0;
  constructor() { }

  ngOnInit(): void {
    this.TEXT_MODAL_SUBMIT.subscribe(
      ()=>this.modal_subscribed()
    )
    this.FORM_MODAL_SUMBIT.subscribe(
      (value)=>this.form_modal_subscribed(value)
    )
  }

  openModal():void{
    this.TEXT_MODAL.visible = true;
    GlobalService.modalCurrent = this.TEXT_MODAL;
  }

  openFormModal():void{
    this.FORM_MODAL.visible = true;
    GlobalService.modalCurrent = this.FORM_MODAL;
  }

  openRubricModal():void{
    this.RUBRIC_MODAL.visible = true;
    GlobalService.modalCurrent = this.RUBRIC_MODAL;
  }

  openImageInputModal():void{
    this.IMAGE_MODAL.visible = true;
    GlobalService.modalCurrent = this.IMAGE_MODAL;
  }

  private modal_subscribed(){
    this.num+=1;
    this.text = "subscribed : " + this.num;
  }

  private form_modal_subscribed(value:FormFieldObject[]):void{
    let nom = value.find((val)=>val.name==='nom')?._value?.toString()
    let sexe = value.find((val)=>val.name==='sexe')?._value?.toString()

    this.text = "name : " + nom
      + '\n \t sexe : ' + sexe;
    // @ts-ignore
    let rubric_name = this.RUBRIC.content.find((val)=>val.name==='nom')
    let rubric_sexe = this.RUBRIC.content.find((val)=>val.name==='sexe');
    if (rubric_name)
      rubric_name.text = nom?nom:'';
    if (rubric_sexe)
      rubric_sexe.text = sexe?sexe:'';
  }
}
