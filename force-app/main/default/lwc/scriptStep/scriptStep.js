import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
// import omniscriptStep from 'omnistudio/omniscriptStep';
// import tmpl from './scriptStep.html';

export default class ScriptStep extends OmniscriptBaseMixin(LightningElement) {


    connectedCallback() {

        console.log('jsonData' + JSON.stringify(this.omniJsonData));
      
    }

    handleClick() {
        
        console.log('chklinkres1' + JSON.stringify(this.omniJsonData));

        //return tmpl;
    }

}