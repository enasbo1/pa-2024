import {Component, OnInit} from "@angular/core";

@Component({
  selector:"pm-root",
  templateUrl:'./app.component.html',
})
export class AppComponent implements OnInit{
  pageTitle: string = "wanderPlace";
  title:string = "title 1";
  ngOnInit(): void {
    (window as any).globalVar = "coucou";
  }

  get status():string{
    if (document.documentURI.split('/').length>3){
      return document.documentURI.split('/')[3]
    }
    return ''
  }

}
