import { LightningElement } from 'lwc';

export default class ApplicationHandle extends LightningElement {

    showEdApp = false;
    selectedLang;
    langErr;
    appName;

    languageOptions = [
        { label: 'English', value: 'en_US' },
        { label: 'Spanish', value: 'es' }
    ];

    handleApplication(event) {
        this.appName = event.target.name;
        if (this.appName == 'Adult Education Application') {
            this.langErr = '';
            this.selectedLang = '';
            this.showEdApp = true;
        }
        else if (this.appName == 'Credit Application') {
            window.open('/applicationportal/s/creditapplication', '_self');
        }

    }

    closeModal() {
        this.showEdApp = false;
    }

    handleEdApplication() {
        if (this.selectedLang != '' && this.selectedLang != undefined) {
            window.open('/applicationportal/s/adult-ed-application' + '?c__LanguageCode=' + this.selectedLang, '_self');
        }
        else {
            this.langErr = 'Complete this field.'
        }
    }

    handleLanguageChange(event) {
        this.langErr = '';
        this.selectedLang = event.detail.value;
    }

}