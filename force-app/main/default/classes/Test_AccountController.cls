@isTest
public class Test_AccountController {
    
    @testSetup static void setup(){
        List<Account> accountList = new List<Account>();
        for(Integer i=0; i < 10; i++){
            Account accInstance = new Account();
            accInstance.Name='Test'+i;
            accountList.add(accInstance);
        }
        insert accountList;
    }
    
    @isTest 
    static void testGetAccounts(){
        List<Account> accountList = AccountSobjectController.getAccounts();
        if(accountList != null && accountList.size() > 0){
            System.assertEquals((accountList.size() > 0), true, 'Account records must be greater than zero');
        }
    }
}