import { LightningElement, track, } from 'lwc';
import findAccounts from '@salesforce/apex/AccountController.findAccounts';
import Asana from '@salesforce/apex/AsanaWebService.ReturnAccessToken';
import demo from '@salesforce/resourceUrl/SDFCImages';
import asana from '@salesforce/resourceUrl/asana';
/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 350;
 
export default class SearchAccountRecord extends LightningElement {
    @track accounts;
    @track error;
    @track msg; 
    @track temp; 
    @track res; 
    @track somecode = "changed value";
    @track codeValue;
    Sfdcimage1 = demo + '/images/1518.png';
    Sfdcimage2 = demo + '/images/Capture.png';

    someCode="Static Resources";
   handleKeyChange(event) {
        // Debouncing this method Do not actually invoke the Apex call as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            findAccounts({searchKey})  
                .then(result => {   
                    this.accounts = result;
                    this.error = undefined; 
                })
                .catch(error => {
                    this.error = error;
                    this.accounts = undefined;
                }); 
        }, DELAY);
        const Http = new XMLHttpRequest();
        this.temp="get all users";
        const url='https://app.asana.com/api/1.0/users';
        Http.open('GET', url);
        Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        Http.setRequestHeader('Accept', 'application/json');
        Http.setRequestHeader("Authorization", 'Bearer '+ this.msg);
        Http.send();
        Http.onreadystatechange=()=>{  
        //console.log(Http.responseText); 
        this.res=Http.responseText;
        }
    }

    loginAsAsana(){
        // var popup= window.open('https://app.asana.com/-/oauth_authorize?response_type=token&client_id=958428247531899&redirect_uri=https://saas-page-483-dev-ed.lightning.force.com/lightning/page/home&scope=&prompt=login', '_blank','width=500,height=500');
        // popup.focus();
        //     this.temp="Not working";
        //     let that = this;
        //     popup.onload = function () {   
        //         that.temp = "something working";
        //         window.open(this.location.hash,'_blank');
                
        //  };
        var popup= window.open('https://app.asana.com/-/oauth_authorize?response_type=code&client_id=958428247531899&redirect_uri=https://saas-page-483-dev-ed.lightning.force.com/lightning/page/home&scope=&prompt=login', '_blank','width=500,height=500');
        //  var dom = popup.document.body;
          //this.msg=dom;
          this.codeValue= popup.location;
          popup.onload = function () {
         
           // console.log("check");
      //    console.log(this.location); 
//         var params = this.location.hash.substring(1).split("#");
// var parts = params[0].split("&");
// var accessToken=parts[0].split("=");
// console.log(accessToken[1]);

 const Http = new XMLHttpRequest();
                    const url='https://app.asana.com/api/1.0/users';
                    Http.open('GET', url);
                    Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    Http.setRequestHeader('Accept', 'application/json');
                  //  Http.setRequestHeader("Authorization", 'Bearer '+accessToken[1]);
                    Http.send();
                   
                    Http.onreadystatechange=()=>{  
                  //  console.log(Http.responseText); 
                    this.res=Http.responseText;
                    }
           popup.close();
            };
     }
}
