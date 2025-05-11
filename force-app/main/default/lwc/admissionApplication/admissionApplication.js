import { LightningElement, track, wire } from 'lwc';
import InsertLeadInfo from '@salesforce/apex/CCC_ApplicationCntr.InsertLead';
import UpdateLeadInfo from '@salesforce/apex/CCC_ApplicationCntr.UpdateLeadInfo';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import LightningConfirm from 'lightning/confirm';
import PersonalPronoun from '@salesforce/schema/Lead.Pronouns';
import AdmissionGoal from '@salesforce/schema/Lead.Admissions_Goal__c';
import Lead_GenderIdentity from '@salesforce/schema/Lead.GenderIdentity';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class Ccc_lwc_admissionsApplication extends LightningElement {

    @track linkValue;
    @track leadReqList;
    @track linkSection = true;
    @track firstName;
    @track lastName;
    @track email;
    @track school;
    @track mobile;
    @track website;
    @track industry;
    @track admissionGoals;
    //@track applications;
    @track personalPronoun;
    @track leadList = {
        firstName: '',
        lastName: '',
        email: '',
        school: '',
        mobile: '',
        website: '',
        industry: '',
        admissionGoals: '',
        currAcademicLevel: ''
    };
    @track reqLeadList = {};
    @track LeadId;
    @track objectNameToGetRecordTypes = 'Lead';
    @track creditValue = 'PersonalSection';
    @track selectedAddressEnable;

    get getCreditSection() {
        return this.linkValue == 'CREDIT' ? true : false;
    }

    get geteEarlyCollegeSection() {
        return this.linkValue == 'EARLYCOLLEGE' ? true : false;
    }

    get getInternationalSection() {
        return this.linkValue == 'INTERNATIONAL' ? true : false;
    }

    get getAdultEducationSection() {
        return this.linkValue == 'ADULTEDUCATION' ? true : false;
    }

    get getLinkSection() {
        return this.linkSection == true ? true : false;
    }

    get getPersonalSection() {
        return this.creditValue == 'PersonalSection' ? true : false;
    }

    get getPersonalDetailButtonDisable() {
        return this.creditValue == 'PersonalSection' ? false : true;
    }

    get getOtherPersonalDetailSection() {
        return this.creditValue == 'OtherPersonalDetailSection' ? true : false;
    }

    get getOtherPersonalDetailButtonDisable() {
        return this.creditValue == 'OtherPersonalDetailSection' ? false : true;
    }

    get getCareerDetailSection() {
        return this.creditValue == 'CareerDetailSection' ? true : false;
    }

    get getCareerDetailButtonDisable() {
        return this.creditValue == 'CareerDetailSection' ? false : true;
    }

    get getPreviewSection() {
        return this.creditValue == 'PreviewSection' ? true : false;
    }

    
    get getPreviewSectionButtonDisable() {
        return this.creditValue == 'PreviewSection' ? false : true;
    }

    get getEditSection(){
       return this.creditValue == 'EditSection' ? true : false;
    }

    get getOtherSectionDependentOnPersonalPronoun(){
       return this.reqLeadList.personalPronoun == 'Other'? true : false;
    }

    get getCareerAddressSection(){
       return this.selectedAddressEnable == 'Yes'? true : false; 
    }

    get options() {
        return [
            { label: 'Mobile', value: 'Mobile' },
            { label: 'Home', value: 'Home' },
            { label: 'Business', value: 'Business' },
        ];
    }
  
    @wire(getObjectInfo, { objectApiName: '$objectNameToGetRecordTypes' })
    leadInfo;


    @wire(getPicklistValues,
        {
            recordTypeId: '$leadInfo.data.defaultRecordTypeId',
            fieldApiName: PersonalPronoun
        }
    )
    PersonalPronoun;

    @wire(getPicklistValues,
        {
            recordTypeId: '$leadInfo.data.defaultRecordTypeId',
            fieldApiName: AdmissionGoal
        }
    )
    AdmissionGoal;

    @wire(getPicklistValues,
        {
            recordTypeId: '$leadInfo.data.defaultRecordTypeId',
            fieldApiName: Lead_GenderIdentity
        }
    )
    Lead_GenderIdentity;

    handleLinkClick(event) {
        this.linkValue = event.target.dataset.value;
        if (this.linkValue != null) {
            this.linkSection = false;
        }
    }

    openCreditSection(event) {
        this.creditValue = event.target.dataset.value;
    }

    handleReqDetailChange(event) {

        let inputName = event.target.name;
        let value = event.target.value;

        console.log('inputName'+inputName);
        console.log('value'+value);

        this.reqLeadList[inputName] = value;
        console.log('reqLeadList'+JSON.stringify(this.reqLeadList));
    }

    async confirmPersonalInfoSaveNextHandler() {
        const result = await LightningConfirm.open({
            message: 'Please review the personal information before the submit',
            variant: 'header',
            label: 'Warning',
            theme: 'error',
        });

        if (result == true) {
            InsertLeadInfo({ reqLdDetail:JSON.stringify(this.reqLeadList)}).then(result => {
             
             if (result != null && result != undefined && result.StatusCode == '200') {
                this.showToast('Success', result.Message, 'success', 'dismissable');
                this.creditValue = 'OtherPersonalDetailSection';
       
             }else if (result != null && result != undefined && result.StatusCode == '400') {
                this.showToast('Error', result.Message, 'error', 'dismissable');
             } 
        })
                .catch(error => {
                    console.log("error" + JSON.stringify(error));

                    var message = 'Exception: ';
                    if (Array.isArray(error.body)) {
                        message = error.body.map(e => e.message).join(', ');
                    } else if (typeof error.body.message === 'string') {
                        message = error.body.message;
                    }
                    this.isLoading = false;
                    this.dispatchEvent(new ShowToastEvent({
                        title: "Error",
                        message: message,
                        variant: "error"
                    }));
                })
        }
    }


    handleCareerDetailChange(event) {
        let inputName = event.target.name;
        let value = event.target.value;

        this.reqLeadList[inputName] = value;
        console.log('reqLeadList'+JSON.stringify(this.reqLeadList));
    }

    handleRecordType(event){
        this.selectedAddressEnable = event.target.value;
        console.log('selectedAddressEnable'+event.target.value);
    }

    handleOtherPeronalSaveNext() {
        this.creditValue = 'CareerDetailSection';
    }

    handlePreviewAndNext() {
        this.creditValue = 'PreviewSection';
        this.leadList.firstName = this.reqLeadList.firstName;
        this.leadList.lastName = this.reqLeadList.lastName;
        this.leadList.email = this.reqLeadList.email;
        this.leadList.school = this.reqLeadList.school;
        this.leadList.mobile = this.reqLeadList.mobile;
        this.leadList.website = this.reqLeadList.website;
        this.leadList.industry = this.reqLeadList.industry;
        this.leadList.admissionGoals = this.reqLeadList.admissionGoals;
        this.leadList.currAcademicLevel = this.reqLeadList.currAcademicLevel;
        this.leadList.birthDate = this.reqLeadList.birthDate;
        this.leadList.genderIdentity = this.reqLeadList.genderIdentity;
        this.leadList.ssn = this.reqLeadList.ssn;
        this.leadList.fullReferrer = this.reqLeadList.fullReferrer;
        this.leadList.phone = this.reqLeadList.phone;
        console.log('leadList: ' + JSON.stringify(this.leadList));
    }

    handleEdit(){
        this.creditValue = 'EditSection';
    }

    handleEditDetailChange(event){
         let inputName = event.target.name;
         let value = event.target.value;

         console.log('inputName'+inputName);
         console.log('value'+value);
         this.leadList[inputName] = value;
         console.log('updList'+JSON.stringify(this.leadList));
    }

    handleSave() {
        console.log('SaveEmailInfo'+this.reqLeadList.email);
        console.log('SaveleadListInfo'+JSON.stringify(this.leadList));
        UpdateLeadInfo({ ldDetail: JSON.stringify(this.leadList),email: this.reqLeadList.email}).then(result => {
             console.log('result'+JSON.stringify(result));
             if (result != null && result != undefined && result.StatusCode == '200') {
                this.showToast('Success', result.Message, 'success', 'dismissable');
             }else if (result != null && result != undefined && result.StatusCode == '400') {
                this.showToast('Error', result.Message, 'error', 'dismissable');
             } 

        })
            .catch(error => {
                console.log("error" + JSON.stringify(error));

                var message = 'Exception: ';
                if (Array.isArray(error.body)) {
                    message = error.body.map(e => e.message).join(', ');
                } else if (typeof error.body.message === 'string') {
                    message = error.body.message;
                }
                this.isLoading = false;
                this.dispatchEvent(new ShowToastEvent({
                    title: "Error",
                    message: message,
                    variant: "error"
                }));
            })
    }

    // Common method for ShowToastEvent
    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

}