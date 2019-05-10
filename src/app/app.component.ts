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

    this.gridDesktop = new GridConfig1('borderlayout', GridConstants.Desktop)
    .addlayout(["west", "north", "north", "north", "north", "north"])
    .addlayout(["west", "center", "center", "center", "center", "east"])
    .addlayout(["west", "south", "south", "south", "south", "east"]);

  this._gridlayoutService.createLayout(this.gridDesktop);

  }
}
