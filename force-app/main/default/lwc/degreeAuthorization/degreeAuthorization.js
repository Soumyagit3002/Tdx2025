import { LightningElement, api } from 'lwc';
export default class DegreeAuthorization extends LightningElement {

     @api translations = [];
     @api applicationData = [];

     radioOptionsYesNo = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];


    handleFormField(event) {

        var fldName = event.target.name;
        var fldval = event.detail.value;
        

        const custEvent = new CustomEvent('sendformvalue', {
            detail: {
                FieldName: fldName,
                Value: fldval
            }
        });
        this.dispatchEvent(custEvent);

    }

}