import { LightningElement, api } from 'lwc';
export default class ApplicationForm extends LightningElement {

    page1 = false;
    page2 = false;
    page3 = false;

    @api
    handleStepChange(currentStepValue) {
        alert(currentStepValue);
        var callEvt = false;
        if (currentStepValue == 1) {
            this.page1 = true;
            callEvt = true;
        }
        else if (currentStepValue == 2) {
            this.page2 = true;
            callEvt = true;
        }
        else if (currentStepValue == 3) {
            this.page3 = true;
            callEvt = true;
        }
        
    }

}