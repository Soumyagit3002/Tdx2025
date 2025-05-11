import { LightningElement, api } from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import getApplicationDetail from '@salesforce/apex/PortalApplicationController.getApplicationDetail';
export default class ReviewAndSubmit extends OmniscriptBaseMixin(LightningElement) {

    @api appId;
    appRecord = [];
    isLoading = false;
    showClgFlds = false;
    under18 = false;
    chk1 = false;
    chk2 = false;
    chk3 = false;
    chk4 = false;
    submitBtnDisabled = true;
    attendClgPreviously = false;

    connectedCallback() {
        this.loadApplication();
    }

    loadApplication() {
        this.isLoading = true;
        getApplicationDetail({ appId: this.appId })
            .then(result => {
                console.log(JSON.stringify(result));
                this.appRecord = result;
                this.under18 = this.appRecord.Test_I_am_18_years_old_or_older__c == 'No' ? true : false;
                const divElement = this.template.querySelector('.borderCSS');
                if (divElement) {
                    if (this.appRecord.Test_I_plan_to_attend__c == 'Harry S Truman College') {
                        divElement.style.border = '3px solid #4D9D2E';
                        divElement.style.borderRadius = '5px';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Olive-Harvey College') {
                        divElement.style.border = '3px solid #592C81';
                        divElement.style.borderRadius = '5px';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Richard J. Daley College') {
                        divElement.style.border = '3px solid #F5A800';
                        divElement.style.borderRadius = '5px';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Wilbur Wright College') {
                        divElement.style.border = '3px solid #00A4B5';
                        divElement.style.borderRadius = '5px';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Kennedy-King College') {
                        divElement.style.border = '3px solid #A42035';
                        divElement.style.borderRadius = '5px';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Malcolm X College') {
                        divElement.style.border = '3px solid #E1251A';
                        divElement.style.borderRadius = '5px';
                    }
                    if (this.appRecord.Test_I_attended_college_outside_the_US__c) {
                        this.showClgFlds = true;
                    }
                    else {
                        this.showClgFlds = false;;
                    }
                    if(this.appRecord.Test_Haveyou_attended_college_previously__c == 'Yes'){
                        this.attendClgPreviously = true;
                    }
                    else{
                        this.attendClgPreviously = false;
                    }
                    this.isLoading = false;

                }
            })
            .catch(error => {
                alert('Error fetching account:', error);
            });
    }

    handlePrevious() {
        this.omniPrevStep();
    }

    handleNext() {
        this.omniNextStep();
    }

    handleChange(event) {
        if (event.target.name == 'chk1') {
            this.chk1 = event.target.checked;
        }
        else if (event.target.name == 'chk2') {
            this.chk2 = event.target.checked;
        }
        else if (event.target.name == 'chk3') {
            this.chk3 = event.target.checked;
        }
        else if (event.target.name == 'chk4') {
            this.chk4 = event.target.checked;
        }

        if(this.chk1 && this.chk2 && (this.chk3 || !this.under18) && this.chk4){
            this.submitBtnDisabled = false;
        }
        else{
            this.submitBtnDisabled = true;
        }
    }



}