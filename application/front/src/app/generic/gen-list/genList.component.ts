import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../shared/foundation/list/listObject";
import {GenListService} from "./genList.service";
import {FilterObject} from "../../shared/foundation/list/filterObject";

@Component({
  templateUrl: './genList.component.html',
  styleUrls: ['./genList.component.scss']
})
export class GenListComponent implements OnInit {
  items:ListObject[] = []
  critera:string[] = [
    'status',
    'function'
  ];
  filter:FilterObject[] = [
    {name : 'status', type:'auto', choices:[]},
    {name : 'function', type:'auto', choices:[]},
  ]
  constructor(private genListService:GenListService) { }

  ngOnInit(): void {
    this.genListService.getProduct().subscribe(
      res =>  res.forEach(value=>this.items.push(value))
    )

  }

}
