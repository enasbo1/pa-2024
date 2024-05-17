import { Component, Input } from '@angular/core';
import { BandObject } from './bandObject';

@Component({
  selector: 'app-info-band',
  templateUrl: './info-band.component.html',
  styleUrls: ['./info-band.component.scss']
})
export class InfoBandComponent {
  @Input() bannerData?: BandObject
}

