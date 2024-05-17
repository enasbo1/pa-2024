import { Component, OnInit } from '@angular/core';
import {BandObject} from "../../shared/foundation/info-band/bandObject";

@Component({
  templateUrl: './gen-info-band.component.html',
  styleUrls: ['./gen-info-band.component.scss']
})
export class GenInfoBandComponent implements OnInit {
  bannerData:BandObject[]=[
    {
      title:"titre",
      description:"un element à afficher",
      link:"/home",
      priority:1
    },
    {
      title:"titre 2",
      description:"vous avez un nouveau message",
      link:"/home",
      priority:4
    },
    {
      title:"titre 3",
      description:"un element à afficher",
      link:"/home",
      priority:2
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
