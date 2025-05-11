import { LightningElement, track } from 'lwc';
export default class Steps extends LightningElement {

    @track steps = [
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
    ];

    handleClick(event) {
        this.activeTabVal = parseInt(event.target.value);
        this.activeTab = event.target.dataset.id;

        const checkValidationEvent = new CustomEvent(
            'changestep', {
            detail: this.currentTab
        });
        this.dispatchEvent(checkValidationEvent);


    }
}