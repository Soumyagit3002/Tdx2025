import { LightningElement, api } from 'lwc';
export default class NameSection extends LightningElement {

    @api applicationData = [];
    @api translations = [];

    get options() {
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