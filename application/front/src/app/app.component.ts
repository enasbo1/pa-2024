import {Component, OnInit} from "@angular/core";

@Component({
  selector:"pm-root",
  templateUrl:'./app.component.html',
})
export class AppComponent implements OnInit{
  pageTitle: string = "wanderPlace";
  title:string = "title 1";
  status:string = "none";
  ngOnInit(): void {
    (window as any).globalVar = "coucou";
  }

}
