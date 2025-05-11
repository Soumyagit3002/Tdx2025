import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import getApplicationDetail from '@salesforce/apex/PortalApplicationController.getApplicationDetail';
export default class IntroTextLWC extends OmniscriptBaseMixin(LightningElement) {

    @api headingText;
    @api introText;
    isReviewScreen = false;

    connectedCallback() {
        if (this.headingText == 'Review & Submit') {
            this.isReviewScreen = true;
        }
    }

}