import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../../../shared/global.service";

@Component({
  selector: 'pm-gestion-location',
  templateUrl: './gestion-location.component.html',
  styleUrls: ['./gestion-location.component.scss']
})
export class GestionLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    GlobalService.pageName = "Location";
  }

}
