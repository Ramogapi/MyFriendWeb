import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-rotator',
  templateUrl: './rotator.component.html',
  styleUrl: './rotator.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RotatorComponent {
  constructor(public loader: LoaderService) { }
}
