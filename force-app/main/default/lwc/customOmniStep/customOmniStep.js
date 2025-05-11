import { LightningElement,wire,api} from 'lwc';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import saveGuestSession from '@salesforce/apex/GuestSessionController.saveGuestSession'
import getSession from '@salesforce/apex/GuestSessionController.getSession'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmailToUser from '@salesforce/apex/EmailUtils.sendEmailToUser'

export default class CustomOmniStep extends OmniscriptBaseMixin(LightningElement) {
    wiredSessionResult;
    sessionList = []
    updateData = {};
    email;
    @api uniqueId='123456789';

    connectedCallback() {

        console.log('jsonDefStep', JSON.stringify(this.omniJsonData));
        const urlParams = new URLSearchParams(window.location.search);
        this.uniqueId =urlParams.get('c__uniqueId');
        console.log('uniuniqueId', urlParams.get('c__uniqueId'));
        
    }


    handleClick() {
        this.createSession();
    }

    handleBlur() {
        console.log('wiredSessionResult', this.wiredSessionResult.data.Session_Data__c);
        const obj = JSON.parse(this.wiredSessionResult.data.Session_Data__c);
        this.updateData = {

            "Academic_Intent1": obj['Academic_Intent1']
        }

        this.omniApplyCallResp(obj);
    }


    createSession() {
        let uniNumber= Math.random().toString(36).slice(2,12);
        saveGuestSession({ omniJsondata: JSON.stringify(this.omniJsonData), uniQueId: uniNumber }).then((res) => {
            //console.log("Success log",res);
             if(res != null && res !=''){
                this.handleSubmitEmail(res);
             }

        }).catch(error => {
            console.error("error", error.message.body)
        })
    }


    @wire(getSession,{sessionId:'$uniqueId'})
    sessionListInfo(result) {
        this.wiredSessionResult = result;
        const { data, error } = result;
        if (data) {   
           // console.log("data of session", JSON.stringify(data));
            this.handleBlur();
     
        }
        if (error) {
            console.error("error in fetching", error)

        }
    }
handleSubmitEmail(resume) {
let subject = 'Resume Your Credit Application';
this.email="nmandaloju@ccc.edu";

//html content
let body = `
            <html>
            <body>
            <p>Hello ,</p>
            <p>You started a credit application</p>
            <p>To continue where you left off, click the link below:</p>
            <p><a href=${resume} target="_blank">Click here to resume</a></p>
            <p>Thank you,<br/>Admissions Team</p>
            </body>
            </html>
            `;
             //Call Apex method to send email
            sendEmailToUser({ emailAddress: this.email, subject: subject, body: body })
                .then(() => {
                    this.showToast('Success', 'Email sent successfully!', 'success');
                })
                .catch(error => {
                    this.showToast('Error', 'Error sending email: ' + error.body.message, 'error');
                });


}

  showToast(title, message,variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

}