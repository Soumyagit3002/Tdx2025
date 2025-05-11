import { LightningElement ,api} from 'lwc';
import omniscriptStepChart from 'omnistudio/omniscriptStepChart';
import omniscriptStepChartItems from 'omnistudio/omniscriptStepChartItems';
import {OmniscriptBaseMixin} from 'omnistudio/omniscriptBaseMixin';
import tmpl from './creditAppStepChartExtension.html';
export default class CreditAppStepChartExtension extends OmniscriptBaseMixin(omniscriptStepChart,omniscriptStepChartItems ){
isVertical;
@api
get currentStepIndex(){
   return this.calculateStepData(this._jsonDef.asIndex).index;
}
@api
get totalSteps(){
    return this.calculateStepData(this._jsonDef.asIndex).length;
}
@api
get stepProgressValueRoundOff(){
    return Math.round(this.calculateStepData(this._jsonDef.asIndex).value);
}
@api
get stepProgressValueUpdated(){
    return this.calculateStepData(this._jsonDef.asIndex).value;
}
@api
get progressBarWidth(){
    return 'width:' + this.stepProgressValueUpdated + '%';
}
    connectedCallback(){

       super.connectedCallback();
        this.isVertical=false;

    }
    renderedCallback(){
        super.renderedCallback();
        this._jsonDef.asIndex;
    }
    render() {
        return tmpl;
    }
    calculateStepData(e){
        const s= this._jsonDef.children.filter(e => "Step" === e.type && !1 !==e.bShow && e?.propSetMap?.stepCharthide !== true)
        const t= s.findIndex(s => e === s.indexInParent)
        const r= t/(s.length-1) * 100;
        return {
            index : t,
            length : s.length-1,
            value: Number.isFinite(r) && t>=0? r : 0
        }
    }

}