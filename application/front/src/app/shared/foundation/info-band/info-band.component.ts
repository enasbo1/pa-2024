import { Component, Input } from '@angular/core';
import { BandObject } from './bandObject';

@Component({
  selector: 'app-info-band',
  templateUrl: './info-band.component.html',
  styleUrls: ['./info-band.component.css']
})
export class InfoBandComponent {
  @Input() bannerData: BandObject = {
    title: '',          // Valeur par défaut vide pour éviter undefined
    description: '',    // Valeur par défaut vide pour éviter undefined
    link: '',           // Valeur par défaut vide pour éviter undefined
    priority: 0         // Assurez-vous que priority a une valeur par défaut qui ne déclenche pas high-priority
  };
}

