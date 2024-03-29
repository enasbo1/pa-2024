import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../shared/foundation/list/listObject";
import {GenListService} from "./genList.service";

@Component({
  templateUrl: './genList.component.html',
  styleUrls: ['./genList.component.scss']
})
export class GenListComponent implements OnInit {
  items:ListObject[] = []
  constructor(private genListService:GenListService) { }

  ngOnInit(): void {
    this.genListService.getProduct().subscribe(
      res =>  res.forEach(value=>this.items.push(value))
    )

  }

}
