import { LightningElement, api, track } from 'lwc';
export default class ProgressIndicator extends LightningElement {
    @api currentStep = 0;
    @track progress = 0;

    
    connectedCallback() {
        if(this.currentStep == 0.5 || this.currentStep == '0.5'){
            this.progress = 5;
        }
        else if(this.currentStep == 1 || this.currentStep == '1'){
            this.progress = 20;
        }
        else if(this.currentStep == 2 || this.currentStep == '2'){
            this.progress = 40;
        }
        else if(this.currentStep == 3 || this.currentStep == '3'){
            this.progress = 60;
        }
        else if(this.currentStep == 4 || this.currentStep == '4'){
            this.progress = 80;
        }
        else if(this.currentStep == 5 || this.currentStep == '5'){
            this.progress = 95;
        }
        
    }
    

}