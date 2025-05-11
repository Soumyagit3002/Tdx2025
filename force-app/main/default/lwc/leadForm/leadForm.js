import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class LeadForm extends LightningElement {

    appOptions = [
        { label: 'Credit app', value: 'Agriculture' },
        { label: 'Adult app', value: 'Apparel' }

    ];


    firstName = '';
    lastName = '';
    email = '';

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleGenerateLead(event) {
        console.log('vhkk', this.firstName);
        event.preventDefault();
        if (this.firstName =='' || this.lastName =='' || this.email =='') {
            this.showToast('Error', 'Please fill in all fields.', 'error');
            return;

        }
        const baseUrl = 'https://citycollegesofchicago2--dev.sandbox.my.site.com/applicationportal/s/adult-ed-application?c__LanguageCode=en_US';
        const url = `${baseUrl}?firstName=${encodeURIComponent(this.firstName)}&lastName=${encodeURIComponent(this.lastName)}&email=${encodeURIComponent(this.email)}`;
        window.open(url, '_blank'); // Opens in new tab
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}