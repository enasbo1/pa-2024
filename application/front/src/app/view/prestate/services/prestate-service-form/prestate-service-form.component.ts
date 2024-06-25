import {Component, OnInit} from '@angular/core';
import {FormFieldType, FormFieldTypeList} from "../../../../shared/base-shared/form-field/formFieldObject";
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

  private current?:FormStepObject;
  private cur_rubric?:FormRubricObject;

  constructor(
    protected translator : TranslatorService,
    private serviceModelService : ServiceModelService ,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    GlobalService.pageName = "Formulaire service ???"
    this.route.params.subscribe((params:Params) => {
      this.serviceModelService.get_one_service(params['id']).subscribe(
        (service:ServiceObject[])=>
            GlobalService.pageName = "Formulaire service " + service[0]?.type?? "???"
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
    this.cur_rubric?.content.push(
      {
        type:type,
        name:'coucou',
        title: 'coucou'
      }
    )
  }
  drop_rubric(rubric:FormRubricObject):void{
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

  protected readonly FormFieldTypeList = FormFieldTypeList;
}
