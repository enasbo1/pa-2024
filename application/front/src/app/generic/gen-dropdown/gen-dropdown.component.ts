import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './gen-dropdown.component.html',
  styleUrls: ['./gen-dropdown.component.scss']
})
export class GenDropdownComponent implements OnInit {
  value:string="";
  choices:string[]=[
    'default',
    'choice 1',
    'choice 2'
  ];
  constructor() { }

  ngOnInit(): void {
  }
  set_value(value:string){
    this.value = value
  }
}
