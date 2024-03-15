import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {LegacyProgressSpinnerMode as ProgressSpinnerMode} from '@angular/material/legacy-progress-spinner';

@Component({
  selector: 'app-progress-snipper',
  templateUrl: './progress-snipper.component.html',
  styleUrls: ['./progress-snipper.component.scss']
})
export class ProgressSnipperComponent {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

}
