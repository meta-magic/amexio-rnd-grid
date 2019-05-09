import { AmexioGridModel1 } from "./gridmodel.component";
import { GridConstants } from "amexio-ng-extensions";

export class GridConfig1 {
    amexiogridmodel: AmexioGridModel1;
    devicevar: any;
    count: number;

    constructor(layoutName: string, layoutType: string) {
        this.amexiogridmodel = new AmexioGridModel1();
        this.amexiogridmodel.layoutType = layoutType;
        this.amexiogridmodel.name = layoutName;
        return this;
    }

    addlayout(layout: any[]): any {
        this.count = layout.length;
        if (this.amexiogridmodel.layoutType === '') {
            this.amexiogridmodel.layoutType = GridConstants.Desktop ;
        }
        this.amexiogridmodel[this.amexiogridmodel.layoutType].push(layout);
        return this;
    }

    getLayout() {
     return this.amexiogridmodel;
    }
}
