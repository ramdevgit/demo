import { LightningElement, track, api } from 'lwc';
import getAccounts from "@salesforce/apex/AccountSobjectController.getAccounts"; 

export default class DisplayAccounts extends LightningElement {
   
    @track accountRecords;
    @track tableColumns;
    @track tableConfig={};

    connectedCallback(){
        console.log('displayAccounts::::');
         
        this.tableConfig.scrollable= true;
        this.tableConfig.scrollableHeight= "500px  ";

        this.constructColumns();
        this.getAccountRecords();

    }
    constructColumns(){
        console.log('constructColumns::::');
        this.tableColumns = [
            {
                label: "Account Name",
                fieldApiName: "Name",
                sourceColumn: "Name",
                type: "text",
                editable: false,
                cssClass: 'slds-truncate slds-align_absolute-center slds-cell-fixed headerNumberCss',
                width : "10%;",
                isButton: false,
                isDynamic: false
            },
            {
                label: "Billing Country",
                fieldApiName: "BillingCountry",
                sourceColumn: "Billing Country",
                type: "text",
                editable: false,
                cssClass: 'slds-truncate slds-align_absolute-center slds-cell-fixed headerNumberCss',
                width : "10%;",
                isButton: false,
                isDynamic: false
            },
            {
                label: "Billing State",
                fieldApiName: "BillingState",
                sourceColumn: "Billing State",
                type: "text",
                editable: false,
                cssClass: 'slds-truncate slds-align_absolute-center slds-cell-fixed headerNumberCss',
                width : "10%;",
                isButton: false,
                isDynamic: false
            },
            {
                label: "Billing City",
                fieldApiName: "BillingCity",
                sourceColumn: "Billing City",
                type: "number",
                editable: false,
                cssClass: 'slds-truncate slds-align_absolute-center slds-cell-fixed headerNumberCss',
                width : "10%;",
                isButton: false,
                isDynamic: false
            }
        ];
    }
    getAccountRecords(){
        console.log('getAcccountRecords::inside:::');
        getAccounts({})
        .then((result)=>{
            console.log('result:::', result);
            this.accountRecords = result;
        })
        .catch((error)=>{
            console.log('error::getAccountRecords::::');
        });
    }

}