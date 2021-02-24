import { LightningElement, track ,api } from 'lwc';

export default class Datatable extends LightningElement {
   
    @api rows;
    @api columns;
    @api tableConfig;
    @api recordId;
    @api currentObjectMapping;

    @track tableProperties = {};//table Properties 
    constructor(){

        super();
        console.log('datatable.constructor::::');

    }

    connectedCallback(){

        console.log('datatable.connectedCallback:::rows:::', JSON.stringify(this.rows));
        console.log('datatable.connectedCallback:::columns:::', JSON.stringify(this.columns));
        console.log('datatable.connectedCallback:::tableConfig:::', JSON.stringify(this.tableConfig));
        console.log('recordId::::', this.recordId);
        
        this.tableProperties.scrollableCls = this.tableConfig.scrollable ? 'slds-table--header-fixed_container' : '' ;
        this.tableProperties.scrollableHeight = this.tableConfig.scrollable && this.tableConfig.scrollableHeight ? 'height:'+this.tableConfig.scrollableHeight +'; border:  var(--lwc-borderWidthThin,1px) solid var(--lwc-colorBorder,rgb(221, 219, 218));'  : '';
        this.tableProperties.scrollableyCls = this.tableConfig.scrollable  ? 'slds-scrollable_y' : '';
        this.tableProperties.scrollableCellCls = this.tableConfig.scrollable  ? 'header slds-cell-fixed '  : ' header ';
        this.tableProperties.scrollableCellStyle = this.tableConfig.scrollable  ? ' border-left: var(--lwc-borderWidthThin,1px) solid var(--lwc-colorBorder,#dddbda)' : '';
        this.tableProperties.scrollableActionClass = this.tableConfig.scrollable  ? 'toggle slds-th__action  slds-text-link--reset scrollable-header-class' : ' slds-text-link--reset slds-th__action';
    }
    get showHeaderButton(){ 
        
        let showHeaderButton = true;
        showHeaderButton = !(this.rows && this.rows.length > 0);
        console.log('showHeaderbutton::', showHeaderButton);
        return showHeaderButton;
    }

    handleAddRow(event){
        
        console.log('datatable::handleAddRow::::');
        this.dispatchEvent(new CustomEvent("addrow", { detail:{...event.detail}, bubbles:true}));
    }
    renderedCallback(){
        console.log('renderedCallback::::datatable:::', JSON.stringify(this.rows), JSON.stringify(this.columns));
        if(this.rows && this.rows.length > 0 && this.template.querySelector('[data-id="addAndRemove"]')){

            let buttonIcon = this.template.querySelector('[data-id="addAndRemove"]');

            console.log('inside:::slds-hide:::', buttonIcon);
            this.template.querySelector('[data-id="addAndRemove"]').className='slds-hide';
        }else if(this.template.querySelector('[data-id="addAndRemove"]')){
            console.log('inside::headerNumberCss::');
            this.template.querySelector('[data-id="addAndRemove"]').classList.remove('slds-hide');
            this.template.querySelector('[data-id="addAndRemove"]').classList.add('headerNumberCss');
        }
            
    }
    
    handleRemoveRow(event){
    
        console.log('datatable::handleRemoveRow::::js:::');
        this.dispatchEvent(new CustomEvent("removerow",{detail:{...event.detail}, bubbles:true}));
    }
    handleEditRow(event){
        
        console.log('handleEditRow::::', event.detail);
        this.dispatchEvent(new CustomEvent("editrow",{detail:{...event.detail}, bubbles:true}));
    }
    handleRecordSelection(event){

        console.log('handleRecordSelection:::datatable::', JSON.stringify(event.detail));
         
        this.dispatchEvent(new CustomEvent("recordselection", { detail:{...event.detail}, bubbles:true }));
      }
      
    handleRecordUnselection(event){
        
        console.log('handleRecordUnSelection:::datatable::', JSON.stringify(event.detail));
        this.dispatchEvent(new CustomEvent("recordunselection", { detail: {...event.detail}, bubbles:true}));
    

    }
    handleDataChange(event){
        console.log('handleDataChange:::datatable.js:::', event.detail);
        this.dispatchEvent(new CustomEvent('inputchange',{
            detail :{...event.detail},bubbles:true
        }));
    }
    
    @api
    validateErrors(){
        console.log('validateErrors::datatable::::');

        let datatableRows = this.template.querySelectorAll("c-datatable-row"),
           isError = false;
   
        datatableRows.forEach((rowCmp) => {
         
           if (rowCmp.onValidateErrors()) {
              isError = true;
           }
         
        });
        return isError;
      }
      
    
}