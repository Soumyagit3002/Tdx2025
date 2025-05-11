import omniscriptStepChart from 'omnistudio/omniscriptStepChart';
import omniscriptStepChartItems from 'omnistudio/omniscriptStepChartItems'
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
import { LightningElement, api } from 'lwc';
import tmpl from './omniscriptStepChartExt.html';
import pubsub from 'omnistudio/pubsub';
import insertGuestJsondata from '@salesforce/apex/GuestSessionController.saveGuestSession';
import getSession from '@salesforce/apex/GuestSessionController.getSession'
import sendEmailToUser from '@salesforce/apex/EmailUtils.sendEmailToUser'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OmniscriptStepChartExt extends OmniscriptBaseMixin(omniscriptStepChart, omniscriptStepChartItems, LightningElement)

{

    columns = ['Academic_Intent1', 'Academic_Intent2', 'Applicant_Overview1', 'Applicant_Overview2', 'Applicant_Overview3', 'Applicant_Overview4','Applicant_Details1','Applicant_Details2','AdditionalInfo'
    ,'Educational_History1','Educational_History2','Financial_Aid_Scholarships','ReviewandSubmit','ReviewandSubmit'];
    stepName = '';
    currentIndex = 0;
    lastindex = 2;
    chkLabel = false;
    wiredSessionResult;
    @api uniqueId;

    modifiedChild = [];
    connectedCallback() {

        const urlParams = new URLSearchParams(window.location.search);
        this.uniqueId = urlParams.get('networkId');

        for (const element of this.jsonDef.children) {
            if (element.name != 'Academic_Intent2' && element.name != 'Applicant_Overview2' && element.name != 'Applicant_Overview3'&& element.name != 'Applicant_Overview4'
            && element.name != 'Applicant_Details2'&& element.name != 'RA_Educational_History2') {
                this.modifiedChild.push(element);
                console.log(element);
            }
        }
       // console.log('jsonDef', this.uniqueId);

          this._handleStepLoadObject = {
            data: this.handleStepLoad.bind(this),
        };
        this._handleSflObject = {
            data: this.handleSfl.bind(this),
        };



        pubsub.register('omniscript_step', this._handleStepLoadObject);
        pubsub.register('omniscript_save_for_later', this._handleSflObject);

    }
    render() {
        console.log('testrender');
        return tmpl;
    }

      async getSessiondata() {
        try {
            const data = await getSession({ sessionName: this.uniqueId });
            this.wiredSessionResult = data;
            this.error = undefined;
            if (data) {
                console.log('data ', JSON.stringify(data));
               // this.lastindex = data.LastStepIndex__c;
                this.navigateTo();
                //this.handleBlur(data);  
                const obj = JSON.parse(data.Session_Data__c);
                this.omniApplyCallResp(obj);
            }
        }
        catch (error) {
            this.error = error;
            this.wiredSessionResult = [];
        }

    }

    disconnectedCallback() {

        pubsub.unregister('omniscript_step', this._handleStepLoadObject);
        pubsub.unregister('omniscript_save_for_later', this._handleSflObject);
    }

 handleStepLoad(data) {
    console.log('inside step load')
        this.getSessiondata();
        this.stepName = data.name;
        this.currentIndex = this.columns.indexOf(this.stepName);
    }

     navigateTo() {
        console.log('inside navigate', this.lastindex, this.currentIndex, this.chkLabel);
        if (this.currentIndex < this.lastindex && this.chkLabel == false && this.uniqueId != null) {
            this.omniNextStep();
        }
        else {
            this.chkLabel = true;
        }

    }

    handleSfl(data) {
         console.log('chk save later', JSON.stringify(data), JSON.stringify(this.jsonDef.response));
       //
        this.createSession();
    }

     createSession() {
        let uniQeId = this.jsonDef.response.vlcTimeTracking.OmniScriptSessionToken;
        insertGuestJsondata({ omniJsondata: JSON.stringify(this.jsonDef.response), uniQueId: uniQeId, LastIndex: this.currentIndex }).then(() => {
            console.log("Success log");
        }).catch(error => {
            console.error("error", error.message.body)
        })
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