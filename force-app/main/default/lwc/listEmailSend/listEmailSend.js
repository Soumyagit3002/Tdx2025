import { LightningElement, track, api, wire } from 'lwc';
import { FlowNavigationBack } from 'lightning/flowSupport';
import { NavigationMixin } from 'lightning/navigation';
import hasPermission from '@salesforce/apex/EmailUtils.hasPermission';
import getEmailCountToday from '@salesforce/apex/EmailUtils.getEmailCountToday';
import sendEmails from '@salesforce/apex/EmailUtils.sendEmails';
import getEmailSendInfo from '@salesforce/apex/EmailUtils.getEmailSendInfo';
import getEmailAddresses from '@salesforce/apex/EmailUtils.getEmailAddresses';
import fetchFileContents from '@salesforce/apex/EmailUtils.fetchFileContents';


export default class ListEmailSend extends LightningElement {
    @api objectName;
    @api recordIdsString;
    @track isModalOpen = false;
    @track isTemplateModalOpen = false;
    @track emailSendInfo = {};
    @track emailOptions = [];
    @track filesData = [];
    fileNames = [];
    fileDisplay = '';
    selectedEmail = '';

    recordIds = [];
    userHasPermission = false;
    emailCountToday = 0;
    emailSubject = '';
    emailBody = '';
    selectedTemplateId = '';
    selectedAttachmentId = [];
    errorMessage = '';
    showEmailForm = false;
    showOverLimitMessage = false;
    showNoPermissionMessage = false;
    showSuccessMessage = false;
    showAttachments = false;
    hasDeanPermission = false;


    @wire(getEmailAddresses)
    wiredEmailAddresses({ error, data }) {
        if (data) {
            this.emailOptions = Object.keys(data).map(key => {
                return { label: data[key], value: data[key] };
            });
            console.log('Email Options:', this.emailOptions);
            if (this.emailOptions.length > 0) {
                this.selectedEmail = this.emailOptions[0].value;
                console.log('Selected Email:', this.selectedEmail);
            }
        } else if (error) {
            console.error('Error fetching email addresses:', error);
        }
    }

    handleEmailChange(event) {
        this.selectedEmail = event.detail.value;
        console.log('Selected Email:', this.selectedEmail);
    }

    connectedCallback() {
        console.log('connectedCallback called');
        console.log('recordIdsString:', this.recordIdsString);
        this.fetchEmailSendInfo();
        try {
            this.recordIds = JSON.parse(this.recordIdsString);
            console.log('Parsed recordIds:', this.recordIds);
            this.checkPermissions().then(hasPermission => {
                this.userHasPermission = hasPermission;
                if (this.userHasPermission) {
                    if (this.recordIds.length > 50 && this.hasDeanPermission === false) {
                        this.showOverLimitMessage = true;
                    } else {
                        this.showEmailForm = true;
                        this.fetchEmailCountToday();
                    }
                } else {
                    this.showNoPermissionMessage = true;
                }
            }).catch(error => {
                console.error('Error in checkPermissions:', error);
                this.showNoPermissionMessage = true;
            });
        } catch (error) {
            console.error('Error parsing recordIdsString:', error);
            this.showNoPermissionMessage = true;
        }
        console.log('Has Permission? : ', this.userHasPermission);
        console.log('Recipient Size: ', this.recordIds.length);
    }
    fetchEmailSendInfo() {
        getEmailSendInfo()
            .then(result => {
                this.emailSendInfo = result;
                console.log('Email Send Info:', this.emailSendInfo);
            })
            .catch(error => {
                this.error = error;
                console.error('Error fetching email send info:', error);
            });
        }

    async checkPermissions() {
        try {
            this.hasDeanPermission = await hasPermission({ permissionName: 'Custom_List_Email_Action_Dean' });
            if (this.hasDeanPermission) return true;

            const hasGeneralUserPermission = await hasPermission({ permissionName: 'Custom_List_Email_Action_General_User' });
            const hasGeneralAdultEdPermission = await hasPermission({ permissionName: 'Custom_List_Email_Action_General_Adult_Ed' });
            
            if ((hasGeneralUserPermission || hasGeneralAdultEdPermission)) {
                return true;
            }
        } catch (error) {
            console.error('Error in permission checks:', error);
        }
        return false;
    }

    async fetchEmailCountToday() {
        try {
            this.emailCountToday = await getEmailCountToday();
        } catch (error) {
            console.error('Error fetching email count today:', error);
        }
    }

    handleEmailSubjectChange(event) {
        this.emailSubject = event.target.value;
    }

    handleEmailBodyChange(event) {
        console.log('handleEmailBodyChange Called');
        this.emailBody = event.target.value;
    }

    handleTemplateSelection(event) {
        try{
        console.log('handleTemplateSelectionCalled');
        const { selectedTemplateId, emailBody, subject, htmlValue } = event.detail;
        console.log('Selected Template ID:', selectedTemplateId);
        console.log('Email Body:', emailBody);
        console.log('HTML Body:', htmlValue);
        console.log('Subject:', subject);

        this.selectedTemplateId = selectedTemplateId;
        if(htmlValue!=null)
            {
            this.emailBody = htmlValue;
            console.log('html body set');
            console.log('html Value: ',htmlValue);
            }
        else{
            this.emailBody = emailBody;
            console.log('plain text body set');
            console.log('html Value: ',htmlValue);
        }
        this.emailSubject = subject;
    }catch(error)
    {
        console.error('Error in handleTemplateSelection:', error.body.message);
        this.errorMessage = error.body.message;
    }
    }

    handleAttachmentUpload(event) {
        try{
        console.log('Handle Attachment Upload Started');
        const uploadedFiles = event.detail.files;
        this.filesData = uploadedFiles.map(file => ({
            filename: file.name,
            base64: file.documentId
        }));
        this.fetchFileContents();
        console.log('Handle Attachment Upload Finished');
        this.fileDisplay = uploadedFiles.map(file => file.name).join(', ');
        this.showAttachments = true;
        this.isModalOpen = false;
    }catch(error)
    {
        console.error('Error in handleAttachmentUpload:', error.body.message);
        this.errorMessage = error.body.message;
    }
    }
    fetchFileContents() {
        fetchFileContents({ documentIds: this.filesData.map(file => file.base64) })
            .then(fileContents => {
                this.filesData = this.filesData.map((file, index) => ({
                    filename: file.filename,
                    base64: fileContents[index]
                }));
            })
            .catch(error => {
                console.error('Error fetching file contents:', error);
            });
    }
    handleUploadFinished(event) {
        console.log('File Uploaded');
        const uploadedFiles = event.detail.files;
        console.log('Uploaded Files:', uploadedFiles);
        this.closeModal();
    }

    async handleSend() {
        try {
            this.showSuccessMessage = true;
            this.showEmailForm = false;
            const params = {
                recordIds: this.recordIds,
                fromAddress: this.selectedEmail,
                emailSubject: this.emailSubject,
                emailBody: this.emailBody,
                files: this.filesData,
                objectName: this.objectName
            };
            if (this.selectedTemplateId) {
                params.emailTemplateId = this.selectedTemplateId;
            }
            await sendEmails( 
                params
            );
            
        } catch (error) {
            console.error('Error in handleSend:', error);
            this.errorMessage = error.body.message;
        }
    }

    handleBack() {
        this.dispatchEvent(new FlowNavigationBack());
    }
    openModal() {
        console.log('Modal Opened');
        this.isModalOpen = true;
    }
    openTemplateModal()
    {
        console.log('Template Modal Opened');
        this.isTemplateModalOpen = true;
    }

    closeModal() {
        console.log('Modal Closed');
        this.isModalOpen = false;
        this.isTemplateModalOpen = false;
    }
    closeTemplateModal() {
        console.log('Template Modal Closed');
        this.isTemplateModalOpen = false;
    }

    handleModalClose() {
        this.closeModal();
    }
    handleNavigateToListView() {
        console.log('HandleNavigateToListView Started');
        try{
        const listViewUrl = `/lightning/o/${this.objectName}/list`;
        console.log(listViewUrl);
        window.history.back();
        //window.location.href = listViewUrl;
    }catch(error)
    {
        console.log('Error in HandleNavigateToListView', error.body.message);
    }
        console.log('HandleNavigateToListView Finished');
    }
    removeAttachments(){
        this.filesData = null;
        this.fileNames = null;
        this.showAttachments = false;
        this.fileDisplay = null;
    }
}