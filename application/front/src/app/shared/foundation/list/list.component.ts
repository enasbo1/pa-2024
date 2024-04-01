import {Component, Input, OnInit} from '@angular/core';
import {TranslatorService} from "../../base-shared/translator.service";
import {ListObject} from "./listObject";
import {TextStyle} from "../../base-shared/textStyle";
import * as events from "events";

@Component({
  selector: 'pm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() items:ListObject[]=[];
  @Input() line_size:number = 2;
  @Input() critera:string[]|undefined;
  search_crit:string="Title";
  translatorService: TranslatorService= new TranslatorService();
  search_value:string="";
  constructor() {}

  ngOnInit(): void {
    if (this.critera){
      let _n = this.critera.reverse()
      _n.push("Title")
      this.critera = _n.reverse()
    }
  }

  filter_item():ListObject[]{
    let filtered_list:ListObject[] = [];
    if (this.search_crit === "Title"){
      filtered_list = this.items.filter(
        item =>
          item.title?.toLowerCase().includes(this.search_value.toLowerCase())
      );
    }else{
      filtered_list = this.items.filter(
        item =>
          item.propriete
            ?.find(value =>
              (value.name?.toLowerCase() === this.search_crit.toLowerCase()))
            ?.value?.toString().toLowerCase().includes(this.search_value.toLowerCase())
      );
    }
    return filtered_list;
  }

  element(item:ListObject):{side:string, content:(TextStyle|null)[]|undefined}[]{
    const to_ret = [
      {side: "right col-4", content: item.right},
      {side: "mid col-4", content: item.mid},
      {side: "left col-4", content: item.left}
    ];
    let retenue: number = 0;
    let mid: string = "mid";
    let retenue_mid: number = 0;

    if (this.is_null_content(item.right)){
      to_ret[0].side = "hided"
      retenue+=1
    }

    if (this.is_null_content(item.mid)){
      mid = "hided"
      retenue+=1
    }else if (retenue==1){
      /* dans le cas où il n'y a pas de right, on met le mid à droite et on aggrandit le mid */
      mid = 'right'
      retenue_mid = retenue;
      retenue = 0;
    }

    if (this.is_null_content(item.left)){
      to_ret[2].side = "hided";
      retenue+=1
    }else{
      if (retenue==1){
        /* dans le cas où il n'y a pas de mid, on met le right et le left à la même taille */
        to_ret[0].side = "right col-6";
        to_ret[2].side = "left col-6";
        retenue=0
      }else{
        to_ret[2].side = "left col-"+(4+retenue*4);
        retenue=0
      }

    }
    /* on applique les changements sur le mid ou le right en fonction que qui existe */
    if (mid!="hided"){
      retenue += retenue_mid
      to_ret[1].side = mid + " col-"+(4+retenue*4)
    }else{
      to_ret[1].side = mid
      if (retenue!=0){
        to_ret[0].side = 'right' + " col-"+(4+retenue*4)
      }
    }

    return to_ret
  }

  elements_size():string{
    if (this.line_size>3){
      this.line_size = 3;
    }
    switch (this.line_size){
      case 3:
        return "col-lg-4 col-md-6";
      case 2:
        return "col-lg-6";
      default:
        return '';
    }
  }
  /*
  * verifie si le contenu d'un pannel d'un ListObject est vide (true si vide)
  *
  **/
  private is_null_content(content:(TextStyle|null)[]|undefined):boolean{
    if (!content){
      return true;
    }
    for(let i of content){
      if (i!==null){
        return false;
      }
    }
    return true;
  }
  switch_rubric(value:string){
    this.search_crit = value;
  }
  protected readonly events = events;
}
