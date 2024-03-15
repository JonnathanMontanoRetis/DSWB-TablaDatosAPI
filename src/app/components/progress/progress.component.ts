import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LegacyProgressBarMode as ProgressBarMode } from '@angular/material/legacy-progress-bar';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

}
