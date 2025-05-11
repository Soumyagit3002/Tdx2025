import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';

export default class NextStepButton extends OmniscriptBaseMixin(LightningElement) {
    @api omniScript; // To receive the OmniScript instance

    handleNext() {
        alert('1');
        this.omniApplyCallResp({
            Citizenship_Status: 'Not a Citizen',
        });
        //this.omniNextStep(); // Moves to the next step in the OmniScript


    }

    handlePrevious() {
        this.omniPrevStep(); // Moves to the next step in the OmniScript
    }
}