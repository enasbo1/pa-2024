import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslatorService} from "../translator.service";

@Component({
  selector: 'pm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  value:string = "empty";
  open:boolean=false
  @Input() default:string|number|undefined;
  @Input() set?:boolean;
  @Input() prefix:string = "";
  @Input() styles:string = "";
  @Input() choices:string[] = [];
  @Output() value_up:EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    if (this.default){
      this.value = this.default.toString();
      if (this.choices.includes(this.value) || this.set){
        this.selectValue(this.value)
      }
    }
    else if (this.choices!==[]){
      this.value = this.choices[0]
    }
  }

  toggle():void{
    this.open = !this.open;
  }

  selectValue(value:string){
    this.open = false;
    this.value = value;
    this.value_up.emit(value);
  }
}
