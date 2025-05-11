import { LightningElement, api } from 'lwc';
export default class TranscriptAuthorization extends LightningElement {

    @api translations = [];
    @api applicationData = [];

    radioOptionsYesNo = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];
    authorizationValidOptions = [
        { label: 'This authorization is valid for 3 years', value: 'This authorization is valid for 3 years' },
        { label: 'This authorization is valid until this specific date', value: 'This authorization is valid until this specific date' }
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