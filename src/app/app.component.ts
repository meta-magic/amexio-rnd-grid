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
  gridDesktop1: GridConfig1;
  gridDesktop2: GridConfig1;

  constructor(private _gridlayoutService: AmexioGridLayoutService1) {

    this.gridDesktop1 = new GridConfig1('borderlayoutdemo1', GridConstants.Desktop)
      .addlayout(["west", "north", "north", "north", "north", "east"])
      .addlayout(["west", "center", "center", "center", "center", "east"])
      .addlayout(["west", "south", "south", "south", "south", "east"]);

    this.gridDesktop2 = new GridConfig1('borderlayoutdemo2', GridConstants.Desktop)
      .addlayout(["north", "north", "north", "north", "north", "north"])
      .addlayout(["west", "center", "center", "center", "center", "east"])
      .addlayout(["south", "south", "south", "south", "south", "south"]);

    this._gridlayoutService.createLayout(this.gridDesktop1);
    this._gridlayoutService.createLayout(this.gridDesktop2);

  }
}
