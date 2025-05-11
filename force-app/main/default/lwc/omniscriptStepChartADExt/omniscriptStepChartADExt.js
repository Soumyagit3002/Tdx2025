import omniscriptStepChart from 'omnistudio/omniscriptStepChart';
import omniscriptStepChartItems from 'omnistudio/omniscriptStepChartItems'
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import { LightningElement, api } from 'lwc';
import tmpl from './omniscriptStepChartADExt.html';

export default class OmniscriptStepChartADExt extends OmniscriptBaseMixin(omniscriptStepChart, omniscriptStepChartItems, LightningElement)

{
    modifiedChild = [];
    connectedCallback() {
        for (const element of this.jsonDef.children) {
            if (element.name != 'Academic_Intent1' && element.name != 'Applicant_Overview1' && element.name != 'Applicant_Overview2' && element.name != 'Application_Details1' && element.name != 'Additional_Background1') {
                this.modifiedChild.push(element);
                console.log(element);
            }
        }
        console.log('jsonDef', JSON.stringify(this.modifiedChild));

    }
    render() {
        console.log('testrender');
        return tmpl;
    }

}