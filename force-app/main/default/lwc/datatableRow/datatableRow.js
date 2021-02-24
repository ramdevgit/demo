import { LightningElement, api,track } from "lwc";
import { getValueFromObject } from "c/utils";

export default class DatatableRow extends LightningElement {
 
  @api columns;
  @api index; //Get the parent index
  @api recordId; // Get the detail page recordId
  @api row; //Datas from parent Component
  @api tableConfig;
  @api currentObjectMapping;
    
 
  connectedCallback(){
   
    console.log('connectedCallback::datatableRow::index::',JSON.stringify(this.index));
    console.log('connectedCallback::datatableRow::columns::',JSON.stringify(this.columns));
    console.log('connectedCallback::datatableRow::row',JSON.stringify(this.row));
    console.log('connectedCallback::datatableRow::tableConfig',JSON.stringify(this.tableConfig));

  }
 
  handleAddRow(event){

    let index = event.detail;
    console.log('handleAddRow::datatableRow::js:::',index );
    this.dispatchEvent(new CustomEvent("addrow",{detail:{...event.detail}, bubbles:true}));
  }
  
  handleRemoveRow(event){
    
    let index = event.detail;
    console.log('handleRemoveRow::datatableRow::js:::', index);
    this.dispatchEvent(new CustomEvent("removerow",{detail:{...event.detail}, bubbles:true}));
  }

  handleEditRow(event){
    
    let index = event.detail;
    console.log('handleEditRow::datatableRow::js:::',index );
    this.dispatchEvent(new CustomEvent("editrow",{detail:{...event.detail}, bubbles:true}));
  }
  
  handleRecordSelection(event){

    console.log('handleRecordSelection:::datatableRow::', JSON.stringify(event.detail));
     
    this.dispatchEvent(new CustomEvent("recordselection", { detail: { index: this.index, ...event.detail}, bubbles:true }));
  }
  
  handleRecordUnselection(event){
    
    console.log('handleRecordUnSelection:::datatableRow::', JSON.stringify(event.detail));
    
    if(event.detail.objectApiName === this.currentObjectMapping.parentObjectApiName){
    
      //this.removeValuesInRowCmps(true);
      this.dispatchEvent(new CustomEvent("recordunselection", { detail: { index: this.index, ...event.detail}}));

    }else if(event.detail.objectApiName === this.currentObjectMapping.childObjectApiName){
        
        this.dispatchEvent(new CustomEvent("recordunselection", { detail: { index: this.index, ...event.detail}}));
        //this.removeValuesInRowCmps(false);

    }
  }


  removeValuesInRowCmps(isParentRecord){

    console.log('datatableRow::removeValuesInRowCmps::');
    let datatableCellInputCmps = this.template.querySelectorAll("c-datatable-cell");
    
    datatableCellInputCmps.forEach((datatableCell)=>{
      console.log('datatabelCell::columnConfig::', JSON.stringify(datatableCell.columnConfig));
       if(isParentRecord){

         datatableCell.removeValuesInCellCmps();

       }else if(!isParentRecord && (datatableCell.columnConfig.lookupProperties 
        && datatableCell.columnConfig.lookupProperties.objectApiName != this.currentObjectMapping.parentObjectApiName 
        && datatableCell.columnConfig.lookupProperties.searchFields.includes(datatableCell.columnConfig.fieldApiName))
        || (datatableCell.columnConfig.lookupProperties.objectApiName != this.currentObjectMapping.parentObjectApiName &&
        !datatableCell.columnConfig.isDynamic)){
         
        datatableCell.removeValuesInCellCmps();

       }
    });
    
  }
 
  handleDataChange(event){
    console.log('handleDataChange::datatableRow:js', event.detail);
   
    this.dispatchEvent(new CustomEvent("inputchange",{
      detail:{ ...event.detail}, bubbles : true
    }));

  }

  @api
  onValidateErrors(){

      console.log('onValidateErrors::datatableRow::::');
      let datatableCellCmps = this.template.querySelectorAll("c-datatable-cell"),
         isError = false;
 
         datatableCellCmps.forEach((datatableCell) => {
       
         if (datatableCell.onValidateErrors()) {
            isError = true;
         }
       
      });
      return isError;
    }
 
}