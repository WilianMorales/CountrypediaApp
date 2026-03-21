import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-globe',
  imports: [],
  templateUrl: './globe.component.html',
  styleUrl: './globe.component.css'
})
export class GlobeComponent {
  @Input() size: number = 130;
  @Input() animated: boolean = true;
  @Input() showPins: boolean = true;
  @Input() showRadar: boolean = true;
  @Input() symbol: '?' | '!' | 'x' | '' = '?';
}
