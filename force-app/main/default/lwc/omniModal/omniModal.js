import { LightningElement, api,wire } from 'lwc';
import omniscriptModal from 'omnistudio/omniscriptModal'
import tmpl from './omniModal.html';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';


export default class OmniModal extends OmniscriptBaseMixin(omniscriptModal,LightningElement) {


    _type;

     @api
    get type() {
        return this._type;
    }

    set type(value) {
       // console.log('set modal', value);
        this._type = value == 'info' ? 'info' : 'success';
        //console.log('setout modal', this._type);
    }

    get checkMessage() {

        return this._type == 'info' ? true : false;
    }

    render() {
        //console.log('in modal');

        return tmpl;

    }
}