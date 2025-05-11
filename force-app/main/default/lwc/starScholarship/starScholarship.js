import { LightningElement, api } from 'lwc';
export default class StarScholarship extends LightningElement {

    @api applicationData = [];
    @api translations = [];

    radioOptionsYesNo = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];

    graduatingOptions = [
        { label: 'Chicago Public Schools', value: 'Chicago Public Schools' },
        { label: 'OCPS Charter/Option/Contract/Alternative Schools', value: 'OCPS Charter/Option/Contract/Alternative Schools' },
        { label: 'Big Shoulders Fund Catholic HS', value: 'Big Shoulders Fund Catholic HS' }
    ];

    get statusOptions() {
        return [
            { label: 'Text1', value: 'Text1' },
            { label: 'Text2', value: 'Text2' },
            { label: 'Text3', value: 'Text3' },
            { label: 'Text4', value: 'Text4' }
        ];
    }

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