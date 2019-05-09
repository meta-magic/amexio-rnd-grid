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
import {Component,  HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'amexio-grid-item1',
  templateUrl : './griditem.component.html',
})
export class AmexioGridItemComponent1 implements OnInit {
  /*
Properties
name : name
datatype :
version : 5.3.1onwards
default : Type of name header/leftside/main/rightside/footer.
description : The name is for determining the name of item.
*/
  @HostBinding('class') hostname: any;
  private _name: string;

  get name(): string{
    return this._name;
  }

  @Input('name')
  set name(value: string) {
    this._name = value;
    this.hostname = this._name;
  }

  @Input('split-position') splitPosition : string;

  constructor() {
  }

  ngOnInit() {
    this.insertStyleSheetRule ('.' + this.name + '{ grid-area: ' + this.name + ' ; padding: 5px } ' );
   }

   insertStyleSheetRule(ruleText: any) {
     if (document && document.styleSheets) {
      const sheets: any = document.styleSheets;
      if (sheets.length === 0) {
        const style = document.createElement('style');
        if (style) {
          style.appendChild(document.createTextNode(''));
          document.head.appendChild(style);
        }
      }
      if (sheets && sheets.length > 1) {
        const sheet: any = sheets[sheets.length - 1];
        this.addRule(sheet, ruleText);
      }
    }
    this.setClassDefinition();
  }
  // TO ADD RULE
  addRule(sheet: any, ruleText: any) {
    if (sheet) {
      sheet.insertRule(ruleText, sheet.rules ? sheet.rules.length : sheet.cssRules.length);
    }
  }

  splitPositionClass : string;
  splitPositionDirection : string;

  setClassDefinition() : void{
    if(this.splitPosition){
      if(this.splitPosition === 'right' || this.splitPosition === 'left')
        this.splitPositionClass = "grid-item-split-vertical-center";
      else if(this.splitPosition === 'top' || this.splitPosition === 'bottom')
        this.splitPositionClass = "grid-item-split-horizonatl-center";
      
      if(this.splitPosition && this.splitPosition === 'right'){
        this.splitPositionDirection = "row-reverse";
      }else if(this.splitPosition && this.splitPosition === 'left'){
        this.splitPositionDirection = "row";
      }else if(this.splitPosition && this.splitPosition === 'bottom'){
        this.splitPositionDirection = "column-reverse";
      }else if(this.splitPosition && this.splitPosition === 'top'){
        this.splitPositionDirection = "column";
      }
    } 
  }
}
