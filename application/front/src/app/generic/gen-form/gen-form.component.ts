import { Component, OnInit } from '@angular/core';
import {FormStepObject} from "../../shared/base-shared/form-step/formStepObject";
import moment  from "moment";
import {RubricObject} from "../../shared/base-shared/rubric/rubricObject";
import {FormFieldObject} from "../../shared/base-shared/form-field/formFieldObject";

@Component({
  selector: 'pm-gen-form',
  templateUrl: './gen-form.component.html',
  styleUrls: ['./gen-form.component.scss']
})
export class GenFormComponent implements OnInit {
  public items:FormStepObject[]=[
    {
      title : "Formulaire : step 1",
      content : [{
        title:"rubric 1: normal",
        content: [
          {
            title : "value",
            name : "value",
            type : "dropdown",
            instruction:"this is a dropdown input",
            choices:[
              "value 1",
              "value 2"
            ]
          },
          {
            title : "text-field",
            name : "text",
            type : "text",
            instruction:"this is a text input",
            placeholder:"text"
          }
        ]
        },
        {
        title:"rubric 2: dates",
        content:[
          {
            title : "place-name",
            name : "place",
            type : "place",
            default:"paris",
            placeholder:"place"
          },
          {
            title : "date",
            name : "date",
            type : "date",
            default : "22/04/2024",
            max : moment("30/04/2024", "DD/MM/YYYY").toDate()
          },
          {
            name : "period",
            type : "period",
            time : true,
            max : moment("30/04/2024 00:00:00", "DD/MM/YYYY HH:mm:ss").toDate()
          },
          {
            name : "url",
            type : "url",
            placeholder:"url",
            default:"localhost",
          },
        ]
      }
      ]
    },
    {
      title : "Formulaire : step 2",
      content:[
      {
        title:"rubric 3 : divers",
        content:[
          {
            name : "file",
            type : "file",
            placeholder:"file",
          },
          {
            name : "regex",
            type : "regex",
            regex:".*i",
            placeholder:"regex",
            default:"di",
          },
        ]
      }]
    },
    {
      title : "Formulaire : step 3",
      content:[
        {
          title:"rubric 4 : divers",
          content:[
            {
              name : "file2",
              type : "file",
              placeholder:"file",
            },
            {
              name : "url2",
              type : "url",
              regex:".*i",
              placeholder:"url",
              default:"di",
            },
          ]
        }]
    }
  ]
  values?:FormFieldObject[]
  constructor() { }

  ngOnInit(): void {
  }

  setValues(values:FormFieldObject[]) : void {
    this.values = values;
  }

}
