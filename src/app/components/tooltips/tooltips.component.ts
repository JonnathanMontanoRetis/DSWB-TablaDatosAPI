import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_LEGACY_TOOLTIP_DEFAULT_OPTIONS as MAT_TOOLTIP_DEFAULT_OPTIONS, MatLegacyTooltipDefaultOptions as MatTooltipDefaultOptions } from '@angular/material/legacy-tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
})
export class TooltipsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
