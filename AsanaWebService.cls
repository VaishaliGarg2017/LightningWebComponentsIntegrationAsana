
public class AsanaWebService{

  public final String ConsumerKey ='977656359567887';
  public final String ConsumerSecret='dcd349e6633da41eb61e582aebc39081';
  public  String RedirectUri ='https://saas-page-483-dev-ed--c.visualforce.com/apex/AuthenticateAsana';
  public String myState ='12345';
  public List<Account> accList;
  public String AccessTokenValue {get; set;}
  
  public AsanaWebService(ApexPages.StandardController controller){
    accList = new List<Account>();
    for(Account acc: [Select id, name from Account Limit 20]){
       accList.add(acc);
    }
    system.debug('Account List is:'+accList);
  }
  
 
  public void ReturnAccessToken(){
     
        String codeVal= ApexPages.currentPage().getParameters().get('code');
        system.debug('codeval'+codeVal);
        
        String endPointUrl = 'https://app.asana.com/-/oauth_token';
        //String body = 'response_type=token&grant_type=authorization_code&code='+codeVal+'&client_id='+ConsumerKey+'&Client_secret='+ConsumerSecret+'&redirect_uri='+RedirectUri;
        
        String body = 'grant_type=authorization_code&code='+codeVal+'&client_id='+ConsumerKey+'&client_secret='+ConsumerSecret+'&redirect_uri='+EncodingUtil.urlEncode(RedirectUri,'UTF-8');

        //String endPointUrl = 'https://app.asana.com/-/oauth_token?response_type=token&grant_type=authorization_code&code='+codeVal+'&redirect_uri='+RedirectUri;
        system.debug('end is here :'+endPointUrl);
       
        Http h= new Http();
        
        HttpRequest req= new HttpRequest();
        req.setMethod('POST');
        req.setBody(body);
        req.setEndPoint(endPointUrl);
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        system.debug('Request is'+req);
        
        HttpResponse res= h.send(req);
        system.debug(res.getBody());
       
        String jsonResponse = res.getBody();
        AccessTokenResponse atr = (AccessTokenResponse) JSON.deserialize(jsonResponse, AccessTokenResponse.class);
        
        AccessTokenValue= atr.access_token;
        system.debug(res.getBody());
        system.debug(res.getStatus());
        system.debug(res.getStatusCode());
        system.debug('********'+atr);
        
        //PageReference pg= new PageReference(endPointUrl);
        //pg.setRedirect(true);
        //return pg;
  }
  
  //To Call WebService Hit 1 to receive the code value 
  public pageReference ReturnCodeValue(){
    
    String endPointUrl = 'https://app.asana.com/-/oauth_authorize?response_type=code&client_id='+ConsumerKey+'&redirect_uri='+RedirectUri+'&state='+myState;
    PageReference pg= new PageReference(endPointUrl);
    pg.setRedirect(true);
    return pg;
    
  }
  
  
  public class AccessTokenResponse{
       
        public String access_token {get;set;}
        public Integer expires_in {get;set;}
        public String token_type {get;set;}
        public String refresh_token {get;set;}
        public String jsObj{get; set;}
        
  }
    
  

}
