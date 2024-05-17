import {EventEmitter, Injectable} from '@angular/core';
import {GlobalService} from "../../global.service";
import {ModalObject} from "./modalObject";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";
import {FormStepObject} from "../../base-shared/form-step/formStepObject";
import {RubricObject} from "../../base-shared/rubric/rubricObject";

@Injectable({
  providedIn: 'root'
})
export class ModaleService {

  constructor() { }


  static openModal(modal:ModalObject):void{
    modal.visible = true;
    GlobalService.modalCurrent = modal;
  }

  static createTextModal(text:string):EventEmitter<void> {
    let event:EventEmitter<void> = new EventEmitter<void>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "quitter",
          end : true,
          action:event
        }
      ],
      content: {
        type:"text",
        text:text,
      }
    })
    return event;
  }

  static createFormModal(form:FormStepObject):EventEmitter<FormFieldObject[]> {
    let event:EventEmitter<FormFieldObject[]> = new EventEmitter<FormFieldObject[]>();
    ModaleService.openModal({
      visible:true,
      options: [],
      content: {
        type:"form",
        form:{
          fields:form,
          submit:event
        },
      }
    })
    return event;
  }

  static createRubricModal(rubric:RubricObject):EventEmitter<void> {
    let event:EventEmitter<void> = new EventEmitter<void>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "quitter",
          end : true,
          action : event
        }
      ],
      content: {
        type:"rubric",
        rubric:rubric,
      }
    })
    return event;
  }

  static createImageModal(image:string):EventEmitter<void> {
    let event:EventEmitter<void> = new EventEmitter<void>();
    ModaleService.openModal({
      visible:true,
      options: [
        {
          name: "quitter",
          end : true,
          action : event
        }
      ],
      content: {
        type:"image",
        image:image,
      }
    })
    return event;
  }
}
