import { LightningElement } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
export default class AcademicIntent2 extends OmniscriptBaseMixin(LightningElement) {

    connectedCallback() {
        let search = window.location.search;
        this.omniApplyCallResp({
            LanguageCode: search,
        });
    }

}