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
import { Component, HostBinding, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amexio-grid-item1',
  templateUrl: './griditem.component.html',
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

  get name(): string {
    return this._name;
  }

  @Input('name')
  set name(value: string) {
    this._name = value;
    this.hostname = this._name;
  }



  @Input('title') title : string;

  @Input('hc-enabled') hcEnabled: boolean;

  @Input('hc-direction') hcDirection: string = "right";

  @Input('vc-enabled') vcEnabled: boolean;

  @Input('vc-direction') vcDirection: string = "top";

  @Output('onToggle') onToggle = new EventEmitter<any>();

  hcPosition: string;
  vcPosition: string

  cPosition: string;

  iconDegree : string;
  iconDegreeData : string [];

  showContent : boolean = true;

  containerDirection :  string = "column";
  constructor() {
    this.iconDegreeData = [];
    this.iconDegreeData['vc-towards-top-true'] = "rotate(270deg)";
    this.iconDegreeData['vc-towards-bottom-true'] = "rotate(90deg)";
    this.iconDegreeData['hc-towards-left-true'] = "rotate(180deg)";
    this.iconDegreeData['hc-towards-right-true'] =  "rotate(0deg)";

    this.iconDegreeData['vc-towards-top-false'] = "rotate(90deg)";
    this.iconDegreeData['vc-towards-bottom-false'] = "rotate(270deg)";
    this.iconDegreeData['hc-towards-left-false'] = "rotate(0deg)";
    this.iconDegreeData['hc-towards-right-false'] =  "rotate(180deg)";

  }

  ngOnInit() {
    this.insertStyleSheetRule('.' + this.name + '{ grid-area: ' + this.name + ' ; padding: 5px } ');
  }

  setClassDefinition(): void {

    if (this.hcEnabled) {
      this.hcPosition = "hc-towards-" + this.hcDirection;
      this.cPosition = "grid-" + this.hcPosition;
      this.iconDegree = this.iconDegreeData[this.hcPosition+'-'+this.showContent];
      this.containerDirection = (this.showContent) ? "column" : "row";
    } else if (this.vcEnabled) {
      this.vcPosition = "vc-towards-" + this.vcDirection;
      this.cPosition = "grid-" + this.vcPosition;
      this.iconDegree = this.iconDegreeData[this.vcPosition+'-'+this.showContent];
      this.containerDirection = "column";
    }
    
    
  }

  toggle(){
    debugger;
    this.showContent = !this.showContent;
    this.setClassDefinition();
    this.onToggle.emit(this);
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

}
