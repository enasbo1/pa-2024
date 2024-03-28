import { Component } from '@angular/core';
import {Data_value} from "../shared/data_value";
import {Space_divider} from "../shared/space_divider";

@Component({
  selector: 'oco-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
    '../main/main.css']
})
export class HomeComponent extends Space_divider{
  nav_content:Data_value[] = [
    {
      value : "Groupes",
      link: "/group-page",
      condition(): boolean {
        return true
      }
    },
    {
      value : "Groupes",
      link: "/group-page",
      condition(): boolean {
        return true
      }
    },
    {
      value : "Groupes",
      link: "/group-page",
      condition(): boolean {
        return true;
      }
    }];

}
