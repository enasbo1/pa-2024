import {Component, Input, OnInit} from '@angular/core';
import {TranslatorService} from "../../base-shared/translator.service";
import {ListObject} from "./listObject";

@Component({
  selector: 'pm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items:ListObject[]=[];
  translatorService: TranslatorService= new TranslatorService();

  constructor() {}

  ngOnInit(): void {
  }
}
