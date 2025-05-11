import { LightningElement, track, wire } from 'lwc';
import getTranslationSteps from '@salesforce/apex/ApplicationHandleController.getTranslationSteps';
import getTranslationValues from '@salesforce/apex/ApplicationHandleController.getTranslationValues';
import getApplicationData from '@salesforce/apex/ApplicationHandleController.getApplicationData';
import saveApplicationData from '@salesforce/apex/ApplicationHandleController.saveApplicationData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ApplicationPage extends LightningElement {

    /*application;

    connectedCallback() {
        let searchItem = window.location.search;
        this.application = searchItem.split('app=')[1];
        this.application = this.application.replaceAll('%20',' ');
    }

    handleChangeStep(event){
        this.template.querySelector('c-application-Form').handleStepChange(event.detail);
    }*/

    currentStep = '1';
    isStep1 = true;
    isStep2 = false;
    isStep3 = false;
    isStep4 = false;
    isStep5 = false;
    isStep6 = false;
    isStep7 = false;
    isStep8 = false;
    isStep9 = false;
    isStep10 = false;
    isStep11 = false;
    isSubmitPage = false;
    applicationData = [];
    validateSuccess = false;
    language = 'English';
    translations = [];
    steps = [];

    /*@track steps = [
        { name: 'Name', value: '1', cls: 'event active' },
        { name: 'Address', value: '2', cls: 'event' },
        { name: 'Contact Information', value: '3', cls: 'event' },
        { name: 'Basic Information', value: '4', cls: 'event' },
        { name: 'Emergency Contact', value: '5', cls: 'event' },
        { name: 'Other Information', value: '6', cls: 'event' },
        { name: 'Education Information', value: '7', cls: 'event' },
        { name: 'Star Scholarship', value: '8', cls: 'event' },
        { name: 'CPS Transcript Authorization', value: '9', cls: 'event' },
        { name: 'One Million Degree Authorization', value: '10', cls: 'event' },
        { name: 'Prior College Information', value: '11', cls: 'event' }
    ];*/

    @wire(getTranslationValues, { language: '$language' })
    wiredgetTranslationValues({ error, data }) {
        if (data) {
            this.translations = data;
            this.error = undefined;
        } else if (error) {
            alert(JSON.stringify(error));
            this.error = error;
            this.outletTypeOptions = [];
        }
    }

    @wire(getTranslationSteps, { language: '$language' })
    wiredgetTranslationSteps({ error, data }) {
        if (data) {
            this.steps = JSON.parse(JSON.stringify(data));
            this.error = undefined;
        } else if (error) {
            alert(JSON.stringify(error));
            this.error = error;
            this.outletTypeOptions = [];
        }
    }

    handleNext() {
        if (this.currentStep == '1') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '2';
                this.isStep1 = false;
                this.isStep2 = true;
                this.steps[1].cls = 'event active';
            }
        }
        else if (this.currentStep == '2') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '3';
                this.isStep2 = false;
                this.isStep3 = true;
                this.steps[2].cls = 'event active';
            }
        }
        else if (this.currentStep == '3') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '4';
                this.isStep3 = false;
                this.isStep4 = true;
                this.steps[3].cls = 'event active';
            }
        }
        else if (this.currentStep == '4') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '5';
                this.isStep4 = false;
                this.isStep5 = true;
                this.steps[4].cls = 'event active';
            }
        }
        else if (this.currentStep == '5') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '6';
                this.isStep5 = false;
                this.isStep6 = true;
                this.steps[5].cls = 'event active';
            }
        }
        else if (this.currentStep == '6') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '7';
                this.isStep6 = false;
                this.isStep7 = true;
                this.steps[6].cls = 'event active';
            }
        }
        else if (this.currentStep == '7') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '8';
                this.isStep7 = false;
                this.isStep8 = true;
                this.steps[7].cls = 'event active';
            }
        }
        else if (this.currentStep == '8') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '9';
                this.isStep8 = false;
                this.isStep9 = true;
                this.steps[8].cls = 'event active';
            }
        }
        else if (this.currentStep == '9') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '10';
                this.isStep9 = false;
                this.isStep10 = true;
                this.steps[9].cls = 'event active';
            }
        }
        else if (this.currentStep == '10') {
            this.saveApplicationData();
            if (this.validateSuccess) {
                this.currentStep = '11';
                this.isStep10 = false;
                this.isStep11 = true;
                this.steps[10].cls = 'event active';
            }
        }
    }

    handlePrevious() {
        if (this.currentStep == '2') {
            this.currentStep = '1';
            this.isStep1 = true;
            this.isStep2 = false;
            this.steps[1].cls = 'event';
        }
        else if (this.currentStep == '3') {
            this.currentStep = '2';
            this.isStep2 = true;
            this.isStep3 = false;
            this.steps[2].cls = 'event';
        }
        else if (this.currentStep == '4') {
            this.currentStep = '3';
            this.isStep3 = true;
            this.isStep4 = false;
            this.steps[3].cls = 'event';
        }
        else if (this.currentStep == '5') {
            this.currentStep = '4';
            this.isStep4 = true;
            this.isStep5 = false;
            this.steps[4].cls = 'event';
        }
        else if (this.currentStep == '6') {
            this.currentStep = '5';
            this.isStep5 = true;
            this.isStep6 = false;
            this.steps[5].cls = 'event';
        }
        else if (this.currentStep == '7') {
            this.currentStep = '6';
            this.isStep6 = true;
            this.isStep7 = false;
            this.steps[6].cls = 'event';
        }
        else if (this.currentStep == '8') {
            this.currentStep = '7';
            this.isStep7 = true;
            this.isStep8 = false;
            this.steps[7].cls = 'event';
        }
        else if (this.currentStep == '9') {
            this.currentStep = '8';
            this.isStep8 = true;
            this.isStep9 = false;
            this.steps[8].cls = 'event';
        }
        else if (this.currentStep == '10') {
            this.currentStep = '9';
            this.isStep9 = true;
            this.isStep10 = false;
            this.steps[9].cls = 'event';
        }
        else if (this.currentStep == '11') {
            this.currentStep = '10';
            this.isStep10 = true;
            this.isStep11 = false;
            this.steps[10].cls = 'event';
        }
    }

    connectedCallback() {
        let searchItem = window.location.search;
        if (searchItem.includes('&lang=')) {
            this.language = searchItem.split('&lang=')[1];
        }
        this.getApplication();
    }

    getApplication() {
        getApplicationData()
            .then(result => {
                this.applicationData = JSON.parse(JSON.stringify(result));
            })
            .catch(error => {
                alert(JSON.stringify(error));
                this.error = error;
            });
    }

    updateFormField(event) {
        if (event.detail.FieldName == 'firstName') {
            this.applicationData.firstName = event.detail.Value;
        }
        else if (event.detail.FieldName == 'lastName') {
            this.applicationData.lastName = event.detail.Value;
        }
        else if (event.detail.FieldName == 'middleName') {
            this.applicationData.middleName = event.detail.Value;
        }

        else if (event.detail.FieldName == 'tempLiving') {
            this.applicationData.tempLiving = event.detail.Value;
        }
        else if (event.detail.FieldName == 'country') {
            this.applicationData.country = event.detail.Value;
        }
        else if (event.detail.FieldName == 'addressLine1') {
            this.applicationData.addressLine1 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'aptUnit') {
            this.applicationData.aptUnit = event.detail.Value;
        }
        else if (event.detail.FieldName == 'city') {
            this.applicationData.city = event.detail.Value;
        }
        else if (event.detail.FieldName == 'state') {
            this.applicationData.state = event.detail.Value;
        }
        else if (event.detail.FieldName == 'postalCode') {
            this.applicationData.postalCode = event.detail.Value;
        }

        else if (event.detail.FieldName == 'preferredPhone') {
            this.applicationData.preferredPhone = event.detail.Value;
        }
        else if (event.detail.FieldName == 'otherPhone1') {
            this.applicationData.otherPhone1 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'otherPhone2') {
            this.applicationData.otherPhone2 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'emailAddress') {
            this.applicationData.emailAddress = event.detail.Value;
        }
        else if (event.detail.FieldName == 'phoneType1') {
            this.applicationData.phoneType1 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'phoneType2') {
            this.applicationData.phoneType2 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'phoneType3') {
            this.applicationData.phoneType3 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'optIn') {
            this.applicationData.optIn = event.detail.Value;
        }

        else if (event.detail.FieldName == 'birthDate') {
            this.applicationData.birthDate = event.detail.Value;
        }
        else if (event.detail.FieldName == 'legalSex') {
            this.applicationData.legalSex = event.detail.Value;
        }
        else if (event.detail.FieldName == 'genderIdentity') {
            this.applicationData.genderIdentity = event.detail.Value;
        }
        else if (event.detail.FieldName == 'socialSecurity') {
            this.applicationData.socialSecurity = event.detail.Value;
        }
        else if (event.detail.FieldName == 'federalFin') {
            this.applicationData.federalFin = event.detail.Value;
        }
        else if (event.detail.FieldName == 'cpsStudent') {
            this.applicationData.cpsStudent = event.detail.Value;
        }
        else if (event.detail.FieldName == 'citizen') {
            this.applicationData.citizen = event.detail.Value;
        }
        else if (event.detail.FieldName == 'birthCountry') {
            this.applicationData.birthCountry = event.detail.Value;
        }
        else if (event.detail.FieldName == 'maritalStatus') {
            this.applicationData.maritalStatus = event.detail.Value;
        }

        else if (event.detail.FieldName == 'conName') {
            this.applicationData.conName = event.detail.Value;
        }
        else if (event.detail.FieldName == 'relToStudent') {
            this.applicationData.relToStudent = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conAddressLine1') {
            this.applicationData.conAddressLine1 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conAddressLine2') {
            this.applicationData.conAddressLine2 = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conCity') {
            this.applicationData.conCity = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conPostalCode') {
            this.applicationData.conPostalCode = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conState') {
            this.applicationData.conState = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conCountry') {
            this.applicationData.conCountry = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conPhone') {
            this.applicationData.conPhone = event.detail.Value;
        }
        else if (event.detail.FieldName == 'conPhoneType') {
            this.applicationData.conPhoneType = event.detail.Value;
        }

        else if (event.detail.FieldName == 'nativeLanguage') {
            this.applicationData.nativeLanguage = event.detail.Value;
        }
        else if (event.detail.FieldName == 'employmentStatus') {
            this.applicationData.employmentStatus = event.detail.Value;
        }
        else if (event.detail.FieldName == 'parentDegree') {
            this.applicationData.parentDegree = event.detail.Value;
        }
        else if (event.detail.FieldName == 'familyIncome') {
            this.applicationData.familyIncome = event.detail.Value;
        }
        else if (event.detail.FieldName == 'parentalStatus') {
            this.applicationData.parentalStatus = event.detail.Value;
        }
        else if (event.detail.FieldName == 'NOfDependents') {
            this.applicationData.NOfDependents = event.detail.Value;
        }
        else if (event.detail.FieldName == 'fosterStatus') {
            this.applicationData.fosterStatus = event.detail.Value;
        }
        else if (event.detail.FieldName == 'workforceStatus') {
            this.applicationData.workforceStatus = event.detail.Value;
        }
        else if (event.detail.FieldName == 'familyServices') {
            this.applicationData.familyServices = event.detail.Value;
        }
        else if (event.detail.FieldName == 'fosterCare') {
            this.applicationData.fosterCare = event.detail.Value;
        }
        else if (event.detail.FieldName == 'counrtOrdered') {
            this.applicationData.counrtOrdered = event.detail.Value;
        }
        else if (event.detail.FieldName == 'age18OrOlder') {
            this.applicationData.age18OrOlder = event.detail.Value;
        }
        else if (event.detail.FieldName == 'adoptionAssistance') {
            this.applicationData.adoptionAssistance = event.detail.Value;
        }
        else if (event.detail.FieldName == 'subsidized') {
            this.applicationData.subsidized = event.detail.Value;
        }
        else if (event.detail.FieldName == 'otherPleaseSpecify') {
            this.applicationData.otherPleaseSpecify = event.detail.Value;
        }

        else if (event.detail.FieldName == 'educationLvl') {
            this.applicationData.educationLvl = event.detail.Value;
        }
        else if (event.detail.FieldName == 'schoolStatus') {
            this.applicationData.schoolStatus = event.detail.Value;
        }
        else if (event.detail.FieldName == 'schoolName') {
            this.applicationData.schoolName = event.detail.Value;
        }
        else if (event.detail.FieldName == 'lastDateAttended') {
            this.applicationData.lastDateAttended = event.detail.Value;
        }
        else if (event.detail.FieldName == 'diplomaDt') {
            this.applicationData.diplomaDt = event.detail.Value;
        }

        else if (event.detail.FieldName == 'chicagoStarS') {
            this.applicationData.chicagoStarS = event.detail.Value;
        }
        else if (event.detail.FieldName == 'cpsGrade') {
            this.applicationData.cpsGrade = event.detail.Value;
        }
        else if (event.detail.FieldName == 'graduatingFrom') {
            this.applicationData.graduatingFrom = event.detail.Value;
        }
        else if (event.detail.FieldName == 'interestedCSS') {
            this.applicationData.interestedCSS = event.detail.Value;
        }
        else if (event.detail.FieldName == 'authorizeHighS') {
            this.applicationData.authorizeHighS = event.detail.Value;
        }
        else if (event.detail.FieldName == 'authorizeACT') {
            this.applicationData.authorizeACT = event.detail.Value;
        }
        else if (event.detail.FieldName == 'authorizeCOC') {
            this.applicationData.authorizeCOC = event.detail.Value;
        }
        else if (event.detail.FieldName == 'idNum') {
            this.applicationData.idNum = event.detail.Value;
        }
        else if (event.detail.FieldName == 'preferredEmail') {
            this.applicationData.preferredEmail = event.detail.Value;
        }

        else if (event.detail.FieldName == 'authorizeCPS') {
            this.applicationData.authorizeCPS = event.detail.Value;
        }
        else if (event.detail.FieldName == 'authorizeDuration') {
            this.applicationData.authorizeDuration = event.detail.Value;
        }
        else if (event.detail.FieldName == 'authorizeDate') {
            this.applicationData.authorizeDate = event.detail.Value;
        }
        else if (event.detail.FieldName == 'cpsIdNum') {
            this.applicationData.cpsIdNum = event.detail.Value;
        }
        else if (event.detail.FieldName == 'authorizeCCOC') {
            this.applicationData.authorizeCCOC = event.detail.Value;
        }

        else if (event.detail.FieldName == 'attendedCollegePreviously') {
            this.applicationData.attendedCollegePreviously = event.detail.Value;
        }
        else if (event.detail.FieldName == 'priorClgEmpStatus') {
            this.applicationData.priorClgEmpStatus = event.detail.Value;
        }
        else if (event.detail.FieldName == 'collegeName') {
            this.applicationData.collegeName = event.detail.Value;
        }
        else if (event.detail.FieldName == 'degree') {
            this.applicationData.degree = event.detail.Value;
        }
        else if (event.detail.FieldName == 'degreeDate') {
            this.applicationData.degreeDate = event.detail.Value;
        }


    }

    saveApplicationData() {
        this.validateSuccess = true;
        if (this.applicationData.firstName == '' || this.applicationData.firstName == undefined || this.applicationData.firstName == null ||
            this.applicationData.lastName == '' || this.applicationData.lastName == undefined || this.applicationData.lastName == null) {
            this.showErrorToast('Complete the required fields.');
            this.validateSuccess = false;
        }

        if (!this.validateSuccess) {
            return;
        }

        saveApplicationData({ wrpRec: this.applicationData })
            .then(result => {
                if (result.result == 'Success') {
                    this.applicationData.leadId = result.leadRecId;
                    this.applicationData.appId = result.appRecId;
                    if (this.isSubmitPage) {
                        this.isSubmitPage = false;
                        this.showSuccessToast('Application has been Submitted successfully.')
                    }
                }
            }).catch(error => {
                alert(JSON.stringify(error));
                this.error = error;
            });
    }

    handleSubmitApplication(){
        this.isSubmitPage = true;
        this.saveApplicationData();
    }

    showErrorToast(msg) {
        const evt = new ShowToastEvent({
            title: '',
            message: msg,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showSuccessToast(msg) {
        const evt = new ShowToastEvent({
            title: '',
            message: msg,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }


}