import { LightningElement, track, wire, api } from 'lwc';
import retrieveEmailTemplates from '@salesforce/apex/EmailUtils.retrieveEmailTemplates';
export default class EmailTemplateModal extends LightningElement {
     emailTemplates = {};
     @api objectName;
     @track filteredEmailTemplates = [];
     @track searchKey = '';
     selectedId = '';
     selectedTemplate;
    columns = [
        { label: 'Template Name', fieldName: 'name', type: 'text' },
        { label: 'Description', fieldName: 'description', type: 'text' },
        { label: 'Folder', fieldName: 'folder', type: 'text' }
    ];
    @wire(retrieveEmailTemplates,{objectName: '$objectName'})
    wiredEmailAddresses({ error, data }) {
        if (data) {
            this.emailTemplates = Object.keys(data).map(key => {
                console.log('Template Name: ',data[key], ': Template Key: ', key);
                return { 
                    id: key, 
                    name: data[key].Name, 
                    description: data[key].Description, 
                    folder: data[key].FolderName , 
                    body: data[key].Body, 
                    htmlValue: data[key].HtmlValue,
                    subject: data[key].Subject};
            });
            console.log('Templates:', this.emailTemplates);
            this.filteredEmailTemplates = this.emailTemplates;
        } else if (error) {
            console.error('Error fetching email templates:', error);
        }
    }
    handleSearchKeyChange(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filterTemplates();
    }

    filterTemplates() {
        if (this.searchKey) {
            this.filteredEmailTemplates = this.emailTemplates.filter(template =>
                template.name.toLowerCase().includes(this.searchKey)
            );
        } else {
            this.filteredEmailTemplates = this.emailTemplates;
        }
    }
    getSelectedTemplate(event) {
        const selectedRow = event.detail.selectedRows[0];
        if (selectedRow) {
            this.selectedId = selectedRow.id;
            this.selectedTemplate = selectedRow;
            console.log('Selected Template Id: ', this.selectedId);
        }
        this.handleTemplate();
    }
    handleTemplate() {
        console.log('handleTemplate Called');
        console.log('Id: ',this.selectedId);
        console.log('body: ',this.selectedTemplate.body);
        const passTemplate = new CustomEvent('passtemplate', {
            detail: {
                selectedTemplateId: this.selectedId,
                emailBody: this.selectedTemplate.body,
                subject: this.selectedTemplate.subject,
                htmlValue: this.selectedTemplate.htmlValue
            }
        });
        console.log('passTemplate Event Created');
        this.dispatchEvent(passTemplate);
        //this.closeModal();
    }
    closeModal(){
        const closeModal = new CustomEvent('closetemplatemodal')
        this.dispatchEvent(closeModal);
    }
}