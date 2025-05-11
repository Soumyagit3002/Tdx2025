import { LightningElement,track } from 'lwc';
import omniscriptSaveForLaterAcknowledge from 'omnistudio/omniscriptSaveForLaterAcknowledge';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { OmniscriptBaseMixin } from 'omnistudio/omniscriptBaseMixin';
// import sendEmailToUser from '@salesforce/apex/EmailUtils.sendEmailToUser';
import tmpl from './omniSaveForLaterAcknowledge.html';

export default class OmniSaveForLaterAcknowledge extends OmniscriptBaseMixin(omniscriptSaveForLaterAcknowledge, LightningElement) {

// custommessage ='To resume, please copy the click or email the link';
// @track email;

connectedCallback() {
 
 //console.log('chklink'+JSON.stringify(this._result));
 //console.log('chklinkres1'+JSON.stringify(this.omniJsonData));

}
       

// handleSubmit() {
// let subject = 'Resume Your Credit Application';
//  this.email="nmandaloju@ccc.edu";
 
//  console.log('chklink'+JSON.stringify(this._result));
//  console.log('chklinkres1'+JSON.stringify(this.omniJsonData));

// //html content
// let body = `
//             <html>
//             <body>
//             <p>Hello ,</p>
//             <p>You started a credit application</p>
//             <p>To continue where you left off, click the link below:</p>
//             <p><a href=${this.resumeLink} target="_blank">Click here to resume</a></p>
//             <p>Thank you,<br/>Admissions Team</p>
//             </body>
//             </html>
//             `;
//              //Call Apex method to send email
//             sendEmailToUser({ emailAddress: this.email, subject: subject, body: body })
//                 .then(() => {
//                     this.showToast('Success', 'Email sent successfully!', 'success');
//                 })
//                 .catch(error => {
//                     this.showToast('Error', 'Error sending email: ' + error.body.message, 'error');
//                 });


// }

//   showToast(title, message,variant) {
//         const event = new ShowToastEvent({
//             title: title,
//             message: message,
//             variant: variant,
//         });
//         this.dispatchEvent(event);
//     }

     render() {
        console.log('testrendersflk');
      //  console.log('chklinkres1'+JSON.stringify(this.omniJsonData));
//  console.log('chklinkres2'+JSON.stringify(jsonDataTest));
//  console.log('chklinkres3'+JSON.stringify(this.jsonDef));
//   console.log('chklinkres4'+JSON.stringify(this.jsonData));
        return tmpl;
    }


}