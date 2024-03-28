export class Space_divider{
  divide_space(nb_element:number):string{
    var ret:string = "col-12";
    var j = 0;
    const n:string[]=["sm","md","lg"]
    for(var i=0; i<3; ++i){
      j = i+2;
      if (nb_element>=j){
        ret+= " col-"+n[i]+"-"+(12/j);
      }
    }
    console.log(ret)
    return ret;
  }
}
