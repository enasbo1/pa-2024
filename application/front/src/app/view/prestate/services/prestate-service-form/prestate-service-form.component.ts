import {Component, OnInit} from '@angular/core';
import {
  FormFieldObject,
  FormFieldType,
  FormFieldTypeList
} from "../../../../shared/base-shared/form-field/formFieldObject";
import {TranslatorService} from "../../../../shared/base-shared/translator.service";
import {FormRubricObject, FormStepObject} from "../../../../shared/base-shared/form-step/formStepObject";
import {ModaleService} from "../../../../shared/foundation/modale/modale.service";
import {FormService} from "../../../../shared/foundation/form/form.service";
import {GlobalService} from "../../../../shared/global.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ServiceObject} from "../../../../http/model/service-model/serviceObject";
import {ServiceModelService} from "../../../../http/model/service-model/service-model.service";

@Component({
  selector: 'pm-prestate-service-form',
  templateUrl: './prestate-service-form.component.html',
  styleUrls: ['./prestate-service-form.component.scss']
})
export class PrestateServiceFormComponent implements OnInit {
  steps:FormStepObject[] = [];
  private on_date:boolean=true;

  private current?:FormStepObject;
  private cur_rubric?:FormRubricObject;
  private service?:ServiceObject;

  public get onDate():boolean{
    return this.on_date
  }

  constructor(
    protected translator : TranslatorService,
    private serviceModelService : ServiceModelService ,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    GlobalService.pageName = "Formulaire service ???"
    this.route.params.subscribe((params:Params) => {
      this.serviceModelService.get_one_service(params['id']).subscribe(
        (service:ServiceObject[])=>{
          GlobalService.pageName = "Formulaire service " + service[0]?.type?? "???";
          this.service = service[0]??undefined
          this.steps = JSON.parse(this.service?.form??'[]') as FormStepObject[];
          if (this.steps.length==0){
            this.newStep()
          }else{
            this.current = this.steps[0]
          }
        }
      );
      if (this.steps.length==0){
        this.newStep()
      }
    })
  }

  get currentStep():FormStepObject|undefined {
    return this.current
  }

  set currentStep(current:FormStepObject|undefined){
    this.current = current
    this.cur_rubric = current?.content[0]?? undefined;
  }

  isCurrent(step:FormStepObject){
    return this.currentStep === step
  }

  edit_step(step:FormStepObject):void{
    this.on_date=false
    ModaleService.createFormModal(
      {
        content:[
          {
            title : 'step title',
            content:[
              {
                name:'title',
                default:step.title,
                placeholder:step.title,
                type:'text'
              }
            ]
          }
        ]
      }
    ).subscribe(
      values=>
        step.title = FormService.get_value(values, 'title', step.title) as string
    )
  }

  drop_step(step:FormStepObject):void{
    this.on_date=false
    ModaleService.createValidationModal('do you want to destroy step "'+step.title+'"')
      .subscribe(
        (yes)=>{
          if (yes==="Oui" && this.steps) {
            this.steps = this.steps.filter(val=>val!==step);
            this.current = this.steps[0]?? undefined
          }
        }
      )

  }
  newStep():void{
    this.on_date=false
    this.cur_rubric = {
      content:[]
    }
    this.current = {
        errorEvent: undefined,
        title: "new step " + (this.steps.length+1),
        content: [
          this.cur_rubric
        ],
      }

    this.steps.push(
      this.current
    )
  }

  addField(type:FormFieldType):void{
    this.on_date=false
    this.cur_rubric?.content.push(
      {
        type:type,
        name:'coucou',
        title: 'coucou'
      }
    )
  }
  drop_rubric(rubric:FormRubricObject):void{
    this.on_date=false
    ModaleService.createValidationModal('do you want to destroy rubric "'+rubric.title+'"')
      .subscribe(
        (yes)=>{
          if (yes==="Oui" && this.current) {
            this.current.content = this.current?.content.filter(val=>val!==rubric)
          }
        }

      )

  }

  newRubric():void{
    this.on_date=false
    this.cur_rubric={
      content:[]
    }
    this.current?.content.push(
      this.cur_rubric
    )
  }

  is_current_rubric(rubric:FormRubricObject):boolean{
    return rubric === this.cur_rubric
  }

  set_rubric(rubric:FormRubricObject):void{
    this.cur_rubric = rubric
  }

  edit_rubric(rubric:FormRubricObject):void{
    this.on_date=false
    ModaleService.createFormModal(
      {
        content:[
          {
            title : 'rubric title',
            content:[
              {
                name:'title',
                default:rubric.title,
                placeholder:rubric.title,
                type:'text'
              }
            ]
          }
        ]
      }
    ).subscribe(
      values=>
        rubric.title = FormService.get_value(values, 'title', rubric.title) as string
    )
  }

  edit_field(field:FormFieldObject):void{
    this.on_date=false
    FormService.edit_field(field)
  }

  drop_field(field:FormFieldObject, rubric:FormRubricObject):void{
    this.on_date=false
    ModaleService.createValidationModal(
      "do you realy want to delete field  \"" + (field.title?? field.name) + '"'
    ).subscribe(
      (yes)=>{
        if (yes==="Oui") {
          rubric.content = rubric.content.filter(val=>val!==field)
        }
      }
    )
  }

  save():void{
    if (this.service){
      this.service.form = JSON.stringify(this.steps)
      this.serviceModelService.edit_service(this.service).subscribe(
        _=>this.on_date = true
      )
    }
  }
  protected readonly FormFieldTypeList = FormFieldTypeList;
}
