import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pm-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  value:string = "empty";
  open:boolean=false
  @Input() choices:string[] = [];
  @Output() value_up:EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    if (this.choices!==[]){
      this.value = this.choices[0]
    }
  }

  dropdown(){
    this.open = true
    this.value_up.emit(this.value)
  }
}
