import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AmexioWidgetModule } from  'amexio-ng-extensions';
import { AmexioGridComponent1 } from './gridlayout/grid.component';
import { AmexioGridItemComponent1 } from './gridlayout/griditem.component';
import { AmexioGridLayoutService1 } from './gridlayout/amexiogridlayoutservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AmexioGridComponent1,
    AmexioGridItemComponent1,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AmexioWidgetModule
  ],
  providers: [AmexioGridLayoutService1],
  bootstrap: [AppComponent]
})
export class AppModule { }
