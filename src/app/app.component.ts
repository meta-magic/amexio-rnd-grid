import { Component } from '@angular/core';
import { AmexioGridLayoutService1 } from './gridlayout/amexiogridlayoutservice.service';
import { GridConfig1 } from './gridlayout/grid.config';
import { GridConstants } from 'amexio-ng-extensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gridlayoutdemo';
  gridDesktop : GridConfig1;
  constructor(private _gridlayoutService: AmexioGridLayoutService1){

    this.gridDesktop = new GridConfig1('LayoutSample1', GridConstants.Desktop)
    .addlayout(["gridmenu", "gridheader", "gridheader", "gridheader", "gridheader", "gridheader"])
    .addlayout(["gridmenu", "gridmain", "gridmain", "gridmain", "gridright", "gridright"])
    .addlayout(["gridfooter", "gridfooter", "gridfooter", "gridfooter", "gridright", "gridright"]);

  this._gridlayoutService.createLayout(this.gridDesktop);

  }
}
