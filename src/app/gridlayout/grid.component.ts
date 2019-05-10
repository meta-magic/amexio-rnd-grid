/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { AmexioGridItemComponent1 } from './griditem.component';

import { GridConstants } from 'amexio-ng-extensions';
import { AmexioGridLayoutService1 } from './amexiogridlayoutservice.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'amexio-layout-grid1',
  templateUrl: './grid.component.html',
})
export class AmexioGridComponent1 implements AfterContentInit, OnInit {
  @ContentChildren(AmexioGridItemComponent1) queryItem: QueryList<AmexioGridItemComponent1>;
  itemCollection: AmexioGridItemComponent1[];

  /*
 Properties
 name : data
 datatype : array
 version : 5.3.1onwards
 default : Data is the a 2D array which user can pass.
 description : The data is for defining the input to be passed.
 */
  _layout: string;
  isInit = false;

  get layout(): string {
    return this._layout;
  }

  @Input('layout')
  set layout(value: string) {
    if (value != null) {
      this._layout = value;
      if (this.isInit) {
        this.gridInit();
      }
    }
  }

  screenWidth: any;
  containerClass: any;
  className: string;
  colCount: number;
  desktopWidth = '(min-width: 1025px)';
  mobileWidth = '(max-width: 767px)';
  tabletWidth = '(min-width: 768px) and (max-width: 1024px)';
  constructor(public _gridlayoutService: AmexioGridLayoutService1) {
  }
  ngOnInit() {
    this.gridInit();
    this.isInit = true;
  }

  gridInit() {
    this.containerClass = '';
    this.className = '';
    this.cssGenreration(this._gridlayoutService.getLayoutData(this.layout));
  }
  getCssAttribute(): string {
    return 'display: grid;' + ' grid-gap: 5px;' + 'grid-template-columns: repeat(' + this.colCount + ', 1fr);';
  }

  insertStyleSheetRuleParent(ruleText: any) {
    const sheets: any = document.styleSheets;
    if (sheets.length === 0) {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
    }
    let isCssAdded = false;
    for (const sh of sheets) {
      const sheet: any = sh;
      if (!isCssAdded && (sheet && sheet.href === null && sheet.rules)) {
        try {
          sheet.insertRule(ruleText, 0);
          isCssAdded = true;
        } catch (e) {
        }
      }
    }
  }

  itemCollectionMap : AmexioGridItemComponent1[];

  ngAfterContentInit() {
    this.itemCollection = this.queryItem.toArray();
    debugger;
    this.itemCollectionMap = [];

    this.itemCollection.forEach((cmp) => {
      this.itemCollectionMap[cmp.name] = cmp;
      return cmp.onToggle.subscribe((cmpObject: any) => this.subscribeToGridItemEvents(cmpObject))
    });
  }
  gridtemplatecolumnconfig : string = "";
  subscribeToGridItemEvents(cmp: AmexioGridItemComponent1) {
    this.gridtemplatecolumnconfig = "";
    debugger;
    let rowConfig = [];
    const layouts : any[] = this._gridlayoutService.getLayoutData(this.layout).desktop;
    layouts.forEach((rows: string[]) =>{
      rows.forEach((name: string) =>{
        
        if(name === cmp.name && rowConfig.length === 0){
          rowConfig = rows;
        }
      });
    });
    debugger;
    let gtcc : string;
    let colConfig = [];
    let prevConfig = "";
    rowConfig.forEach((name: string) =>{
      let cmp = this.itemCollectionMap[name];
      if(cmp.showContent){
        //this.gridtemplatecolumnconfig = this.gridtemplatecolumnconfig + " 1fr "
        colConfig.push(" 1fr ");
      } else if(cmp.name === prevConfig){
        colConfig[colConfig.length-1] = " 1fr ";
        colConfig.push(" 1fr ");
      } else
      {
        //this.gridtemplatecolumnconfig = this.gridtemplatecolumnconfig + " auto "
        colConfig.push(" auto ");
      }
      prevConfig = cmp.name;
    });
    debugger;
    colConfig.forEach((name : string)=>{
      this.gridtemplatecolumnconfig = this.gridtemplatecolumnconfig + name;
    })
    console.log(this.gridtemplatecolumnconfig);
  }



  dataCreation(deviceName: any[]): string {
    this.containerClass = '';
    deviceName.forEach((ele: any) => {
      this.containerClass = this.containerClass + '"' + ele.join(' ') + '"';
    });
    return this.containerClass;
  }

  cssGenreration(layoutData: any) {
    this.colCount = layoutData.count;
    this.className = this.className + '' + layoutData.name;
    if (layoutData.desktop.length > 0) {
      this.cssGenerationCommonMethod(layoutData, this.desktopWidth, GridConstants.Desktop);
      if (layoutData.tab.length === 0) {
        this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Desktop);
      } else {
        this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Desktop);

        this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Tablet);
      }
      if (layoutData.mobile.length === 0 && layoutData.tab.length === 0) {
        this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Desktop);
      } else if (layoutData.mobile.length === 0 && layoutData.tab.length > 0) {
        this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Tablet);
      } else {
        this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Mobile);
      }
    } else {
      this.cssGenerationNoDesktop(layoutData);
    }
  }
  // Refactored above method
  cssGenerationNoDesktop(layoutData: any) {
    if (layoutData.tab.length > 0 && layoutData.mobile.length === 0) {
      this.cssGenerationCommonMethod(layoutData, this.desktopWidth, GridConstants.Tablet);
      this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Tablet);
      this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Tablet);

    } else if (layoutData.tab.length === 0 && layoutData.mobile.length > 0) {
      this.cssGenerationCommonMethod(layoutData, this.mobileWidth, GridConstants.Mobile);
      this.cssGenerationCommonMethod(layoutData, this.tabletWidth, GridConstants.Mobile);
      this.cssGenerationCommonMethod(layoutData, this.desktopWidth, GridConstants.Mobile);
    }
  }

  cssGenerationCommonMethod(layoutData: any, screenWidth: string, deviceType: string) {
    this.insertStyleSheetRuleParent('@' + 'media' + screenWidth + '{' + '.' + layoutData.name +
      '{' + this.getCssAttribute() + ' grid-template-areas: ' +
      this.dataCreation(layoutData[deviceType]) + '}' + '}');
  }
}
