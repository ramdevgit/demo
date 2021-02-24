public class AccountSobjectController {
 
    @AuraEnabled    
    public static List<Account> getAccounts(){
        List<Account> accountList = [SELECT Id, Name, BillingCountry, BillingCity, BillingState FROM Account LIMIT 200];
        return accountList;
    }    
}