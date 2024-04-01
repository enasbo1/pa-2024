import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  value:string = "empty";
  open:boolean=false
  @Input() styles:string = "";
  @Input() choices:string[] = [];
  @Output() value_up:EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    if (this.choices!==[]){
      this.value = this.choices[0]
    }
  }

  toggle(){
    this.open = !this.open;
  }

  selectValue(value:string){
    this.open = false;
    this.value = value;
    this.value_up.emit(value);
  }
}
