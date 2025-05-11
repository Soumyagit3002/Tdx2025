import { LightningElement, api } from 'lwc';
import getApplicationDetail from '@salesforce/apex/PortalApplicationController.getApplicationDetail';
export default class RenderCollegeInfo extends LightningElement {

    @api appId;
    isLoading = false;
    appRecord = [];

    connectedCallback() {
        this.loadApplication();
    }

    loadApplication() {
        this.isLoading = true;
        getApplicationDetail({ appId: this.appId })
            .then(result => {
                console.log(JSON.stringify(result));
                this.appRecord = result;
                const divElement = this.template.querySelector('.theme');
                if (divElement) {
                    if (this.appRecord.Test_I_plan_to_attend__c == 'Harry S Truman College') {
                        divElement.style.color = '#4D9D2E';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Olive-Harvey College') {
                        divElement.style.color = '#592C81';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Richard J. Daley College') {
                        divElement.style.color = '#F5A800';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Wilbur Wright College') {
                        divElement.style.color = '#00A4B5';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Kennedy-King College') {
                        divElement.style.color = '#A42035';
                    }
                    else if (this.appRecord.Test_I_plan_to_attend__c == 'Malcolm X College') {
                        divElement.style.color = '#E1251A';
                    }
                    this.isLoading = false;
                }
            })
            .catch(error => {
                alert('Error fetching account:', JSON.stringify(error));
            });
    }

}