import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'pm-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  @Input() pageTitle: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
