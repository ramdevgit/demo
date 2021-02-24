import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Toast extends LightningElement {
    @api
    showNotification({ title, message, variant, type, mode = 'dismissable', isStandardToast }) {
        console.log('message::showNotification:::', message);
        if (isStandardToast) {
            const evt = new ShowToastEvent({
                title,
                message,
                variant,
                type,
                mode
            });
            this.dispatchEvent(evt);
        }
    }
}