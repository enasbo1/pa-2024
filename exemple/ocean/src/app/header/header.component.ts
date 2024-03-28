import { Component } from '@angular/core';
import {Data_value} from "../shared/data_value";

@Component({
  selector: 'oco-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nav_content:Data_value[] = [
    {
      value : "Home",
      link: "home_page",
      condition(): boolean {
        return true
      }
    }
  ]
}
