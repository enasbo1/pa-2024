import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormFieldObject} from "./formFieldObject";

@Component({
  selector: 'pm-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  @Input() field?:FormFieldObject;
  @Output() submit:EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(value:string){
    this.submit.emit(value);
  }

}
