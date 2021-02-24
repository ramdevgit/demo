import { LightningElement, api, track } from 'lwc';

/* This imported function used to show toast, filter errors, get Values from record */
import {formToastPropertiesMap, filterErrors, getValueFromObject } from "c/utils";

export default class DatatableCell extends LightningElement {
    
    
    @api columnConfig; //Cell configuration is passed from datarow
    @api row; // Data row
    @api tableConfig;
    @api index;
    @api recordId;

    @track formattedData; 
    @track lookupProperties;

    constructor(){
        super();
        console.log('datatableCell::constructor::');
    }
   

    get formattedValue(){
        
        if(this.columnConfig && !this.columnConfig.isButtonIcons){

            let getColumnField = this.columnConfig.fieldApiName;
        
            let value = getValueFromObject(
                this.row,
                typeof getColumnField === "function"
                  ? getColumnField(this.row)
                  : this.columnConfig.fieldApiName
              );
              console.log('getColumnField::' ,getColumnField,'value:::', value);
              return value;
        }
        
    }

    get formattedMessage(){

        return this.row.message ? this.row.message : '';
    }

    connectedCallback(){

        this.constructFormattedData();

        console.log('this.row::', JSON.stringify(this.row));
        console.log('datatableCell:::connectedCallback:::this.columnConfig.fieldApiName', this.columnConfig.fieldApiName);
    }
    constructFormattedData(){

        console.log('constructFromattedData:::');
        let formattedData ={};
        let getColumnField = this.columnConfig.fieldApiName;

        formattedData.fieldApiName =  typeof getColumnField === "function"
        ? getColumnField(this.row)
        : this.columnConfig.fieldApiName;

        formattedData.isText = this.columnConfig && this.columnConfig.type === "text" ? true : false;
        formattedData.isNumber = this.columnConfig && this.columnConfig.type === "number" ? true : false;
        formattedData.cellClass = this.columnConfig && this.columnConfig.cellClass ? this.columnConfig.cellClass : "";
        formattedData.isLookup = this.columnConfig && this.columnConfig.type == 'lookup' ? true: false;
        formattedData.isButtonIcons = this.columnConfig && this.columnConfig.type == 'buttonIcons' ? true : false;

        if(formattedData.isLookup){
            console.log('formattedData::isLookup::', JSON.stringify(this.columnConfig.lookupProperties));
            this.lookupProperties = this.columnConfig.lookupProperties;
        }
        
        if(formattedData.isButtonIcons){
            
            let buttonIcons = this.columnConfig.buttonIcons;
            let cssAddedButtonIcons = [];
            buttonIcons.forEach(buttonIcon =>{
                console.log('buttonCss::', buttonIcon.cssClass);
                let updateButtonIcon = {...buttonIcon};
                let cssClass = updateButtonIcon.cssClass;
                let updatedCss;
                if(typeof (cssClass) === "function"){
                    console.log('before::');
                    updatedCss = cssClass(this.row);
                    console.log('after::');
                }else{
                    updatedCss = updateButtonIcon.cssClass;
                    console.log('updat:',updateButtonIcon.cssClass);
                }
                console.log('before::updateButtonIcon.cssClass = updatedCss;');

                updateButtonIcon["cssClass"] = updatedCss;
                console.log('after::updateButtonIcon.cssClass = updatedCss;');
                cssAddedButtonIcons.push(updateButtonIcon);
                console.log('pushed::', updateButtonIcon);
            });
           
            formattedData.buttonIcons = cssAddedButtonIcons;

        }
        if(this.columnConfig && !this.columnConfig.isButtonIcons){
            
            formattedData.value = getValueFromObject(
                this.row,
                typeof getColumnField === "function"
                ? getColumnField(this.row)
                    : this.columnConfig.fieldApiName
            );
        }
        
        this.formattedData =  formattedData;
        console.log('index:::', this.index, 'formattedData::', JSON.stringify(this.formattedData));
   
    }

    //Getter to check editatble or not
   get isEditable() {
   
    let isEditable = false;
    if (typeof this.columnConfig.editable === "function") {
    
        let rowFunc = this.columnConfig.editable;
        isEditable = rowFunc(this.row);
    } else {
        isEditable = this.columnConfig.editable;
    }
    return isEditable;
  }

 
 
  handleRecordSelection(event){

    console.log('datatableCell::handleRecordSelection::', JSON.stringify(event.detail));
    this.dispatchEvent(new CustomEvent("recordselection", { detail: { index: this.index, ...event.detail }, bubbles : true }));
  }

  handleRecordRemove(event){

    console.log('datatableCell::::handleRecordRemove:::');
    
    let lwcLookupCmps = this.template.querySelectorAll("c-lwc-lookup");
    lwcLookupCmps.forEach((lookup) => {
        lookup.apiRemoveSelected();
    });

    this.dispatchEvent(new CustomEvent("recordunselection", { detail: { index: this.index, ...event.detail}}));

    }

    handleAddRow(event){
        
        console.log('datatabelCell:handleAddRow:::');
        this.dispatchEvent(new CustomEvent("addrow",{detail:{index:this.index}}));

    }

    handleRowAction(event){

        console.log('handleRowAction:::datatableCell:::', event.target.name);
        if(event.target.name == "handleEditRow"){

            console.log('inside:handleEditRow');
            this.dispatchEvent(new CustomEvent("editrow", {detail:{index:this.index}}));
        }else if(event.target.name == "handleAddRow"){
            
            console.log('inside:handleAddRow');
            this.dispatchEvent(new CustomEvent("addrow", {detail:{index:this.index}}));
        }else if(event.target.name == "handleRemoveRow"){
            
            console.log('inside:handleRemoveRow');
            this.dispatchEvent(new CustomEvent("removerow", {detail:{index:this.index}}));
        }
    }
    renderedCallback() {

       console.log('renderedCallback::', this.index, 'row:::', JSON.stringify(this.row));
    }
    get errorMessage(){
        return this.row && this.row.message ? this.row.message : '';
    }
    get hasErrorMessage(){
        return this.columnConfig.fieldApiName === 'addToLoad' && (this.row && this.row.message && this.row.message != '')  ? true : false;
    }

    handleRemoveRow(event){
        
        console.log('datatableCell::handleRemoveRow:::');
        this.dispatchEvent(new CustomEvent("removerow",{detail:{index:this.index}}));

    }
    
    @api
    removeValuesInCellCmps(){

        console.log('removeValuesInCellCmps::datatableCell::');

        let lwcLookupCmps = this.template.querySelectorAll("c-lwc-lookup");
      
        lwcLookupCmps.forEach((lookup) => {
          lookup.apiRemoveSelected();
        });

        let lightningInputCmps = this.template.querySelectorAll("lightning-input");
        lightningInputCmps.forEach((input)=>{
            input.value = '';
        });

    }

   

    
    @api
    onValidateErrors(){
        
        console.log('onValidateErrors:::datatableCell::::');

        const allValid = [
        ...this.template.querySelectorAll("lightning-input")
        ].reduce((validSoFar, inputCmp) => {
        inputCmp.reportValidity();
        return validSoFar && inputCmp.checkValidity();
        }, true);
        return !allValid;
    }
    handleDataChange(event){
        console.log('handleDataChange::datatableCell::js:name;', event.target.name);
        console.log('handleDataChange::datatabelCell:::value:', event.target.value);
        let fieldApiName = event.target.name;
        let value = event.target.value;
        this.dispatchEvent(new CustomEvent('inputchange',{
            detail:{
                index: this.index, 
                fieldApiName: fieldApiName,
                value: value
            }
        }));
    }
    

}