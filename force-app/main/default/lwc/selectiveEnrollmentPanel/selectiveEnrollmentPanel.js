import { LightningElement, api } from 'lwc';
import { subscribe, onError } from 'lightning/empApi';
import USER_ID from '@salesforce/user/Id';

import launchEvent from "@salesforce/apex/SelectiveEnrollmentEventPublisher.launch";
import determineEligibility from "@salesforce/apex/SelectiveEnrollmentEventPublisher.determineEligibility";

export default class SelectiveEnrollmentPanel extends LightningElement {
    @api recordId;

    startTime;
    totalSeconds;
    eventRecordId;
    emplId;
    payload;

    batchSize = 200;
    bigLabel = `Launch ${this.batchSize} Events`;

    CHANNEL = '/event/SE_Boomi_to_CRM_Event__e';

    subscription = {};
    connectedCallback(){
        console.log('Version 2.0');
        console.log('USER_ID : ' + USER_ID);
        this.handleSubscribe();
    }
    
    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

    handleSubscribe(){
        subscribe(this.CHANNEL, -1, (response) => {
            try {
                let message = JSON.parse(JSON.stringify(response));
                // Response contains the payload of the new message received
                // let eventRecordId = message.data?.payload.CRM_Record_ID__c;
        
                // if (eventRecordId == USER_ID){
                    this.emplId = message.data?.payload.EMPLID__c;
                    this.payload = message.data?.payload.Payload__c;
                    this.totalSeconds = (Date.now() - this.startTime)/1000;
                    console.log("Response : " + this.payload);
                    console.log(this.totalSeconds + " seconds");
                // }

                determineEligibility({payload: this.payload})
                    .then(response => console.log(response));

            } catch(error){
                console.log("error : " + JSON.stringify(error));
            }
        }).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;

            if (this.subscription != {}){
                console.log("this.subscription : " + JSON.stringify(this.subscription));
            }
        });

        // Register error listener
        this.registerErrorListener();
    }
    
    handleClick() {
        this.startTime = Date.now();
        launchEvent({userId : USER_ID})
        .then(response => console.log('Launch response : ' + JSON.stringify(response)))
        .catch(error => console.log('Launch error : ' + JSON.stringify(error)));
    }

    handleBigClick() {
        this.startTime = Date.now();
        for (let i = 0; i < this.batchSize; i++){
            launchEvent({userId : USER_ID});
        }
    }
}