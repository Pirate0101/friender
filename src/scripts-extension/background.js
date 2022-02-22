import { host } from '../config';
import { GetData } from '../helper/helper';
// const axios = require('axios')
// import { GetData } from '../helper/helper';
const getApiUrl = host;
// const MessageListUrl = `https://www.facebook.com/messages`;
const mBasicUrl = 'https://mbasic.facebook.com';
// const mFacebook = 'https://m.facebook.com';
const method = { POST: "post", GET: "get", PUT: "put", DELETE: "delete" };
const toJsonStr = (val) => JSON.stringify(val);
// let isFirstTime = true;
chrome.storage.local.set({"tabInfo":{"isBlocked": false, tabId:0}})
chrome.storage.local.set({"isFirstTime":true})
/** 
 * @handleRequest
 * this function will handel the https request
 * 
*/
const handleRequest = (path, methodType, bodyData) => {
    let getWithCredentialHeader = {
        'Accept': 'application/json', 'Content-Type': 'application/json','Access-Control-Allow-Origin': true
    };
    return fetch(getApiUrl + path, {
      method: methodType,
      headers: getWithCredentialHeader,
      body: bodyData,
    });
};
/** 
 * This Section will Listen to the message send form the Tab Pages
 * 
*/
chrome.runtime.onMessage.addListener(async function(request, sender) {
  const gfs = chrome.storage.local;
  //  console.log("CheckMessageNReply : ", CheckMessageNReply);
  let fbmunread, fbprofile, kyubi_user_token,  fbthread;
  fbprofile = await getData('fbprofile');
  fbmunread = await getData('fbmunread');
  kyubi_user_token = await getData('kyubi_user_token');
  fbthread = await getData('fbthread');
  
  if (request.type == "storeUserInfoOrQueryThenStore"){
      let  params = {
        user_rec    :   kyubi_user_token,
        fb_id   :   request.options.FacebookId,
        fb_username :   request.options.FacebookUsername,
        fb_name :   request.options.FacebookName,
        fb_image    :  request.options.FacebookImage,
        fb_logged_id    :   request.options.LoggedInFacebook
      };
      if(request.options.LoggedInFacebook === true){
        gfs.set({'fb_id': request.options.FacebookId});
        gfs.set({'fb_username': request.options.FacebookUsername});
        gfs.set({'fb_name': request.options.FacebookName});
        gfs.set({'fb_image': request.options.FacebookImage});
        gfs.set({'fb_logged_id': request.options.LoggedInFacebook});
        gfs.set({'inBackgroundFetching': false});
      }
      await handleRequest(
        "/api/user/userCheckStoreNRetrive",
        method.POST,
        toJsonStr(params)
      ).then(async response =>  {
          let responsenewvalue = await response.json();
          let  urlArray=[];
          //  console.log("This from DB",responsenewvalue);
          gfs.set({'CheckMessageNReply': 0});
          // gfs.set({'ListURLArray': urlArray});
          gfs.set({'kyubi_user_token': responsenewvalue.payload.UserInfo.kyubi_user_token});
          gfs.set({'user_id': responsenewvalue.payload.UserInfo.user_id});
          gfs.set({'fb_id': responsenewvalue.payload.UserInfo.facebook_fbid});
          gfs.set({'fb_username': responsenewvalue.payload.UserInfo.facebook_name});
          gfs.set({'fb_name': responsenewvalue.payload.UserInfo.facebook_profile_name});
          gfs.set({'fb_image': responsenewvalue.payload.UserInfo.facebook_image});
          gfs.set({'fb_logged_id': request.options.LoggedInFacebook});
          gfs.set({'inBackgroundFetching': false});
          let AutoResponderStatus = 0; 
          let DefaultMessageStatus =0;
          let UserLoggedInFacebook=request.options.LoggedInFacebook;
          let BackGroundFetchingStatus  =false;
          if(responsenewvalue.payload.UserSettings.default_message){
            gfs.set({'default_message': responsenewvalue.payload.UserSettings.default_message});
            DefaultMessageStatus=responsenewvalue.payload.UserSettings.default_message;
          }else{
            gfs.set({'default_message': 0});
          }
          if(responsenewvalue.payload.UserSettings.default_message_text){
            gfs.set({'default_message_text': responsenewvalue.payload.UserSettings.default_message_text});
          }else{
            gfs.set({'default_message_text':""});
          }
          if(responsenewvalue.payload.UserSettings.autoresponder){
            gfs.set({'autoresponder': responsenewvalue.payload.UserSettings.autoresponder});
            AutoResponderStatus=responsenewvalue.payload.UserSettings.autoresponder;
          }else{
            gfs.set({'autoresponder': 0});
          }
          if(responsenewvalue.payload.UserSettings.default_time_delay){
            gfs.set({'default_time_delay': responsenewvalue.payload.UserSettings.default_time_delay});
          }
          gfs.set({'keywordsTally': JSON.stringify(responsenewvalue.payload.AutoResponderKeywords)});
          if(fbprofile){
            let newtab=parseInt(fbprofile);
            chrome.tabs.remove(newtab, function() { 
            });
            gfs.remove(['fbprofile']);
          }
          if((AutoResponderStatus == 1 || DefaultMessageStatus == 1) && UserLoggedInFacebook== true && BackGroundFetchingStatus==  false ){
            if(fbmunread){
              let fbmunreadTab=parseInt(fbmunread);
              chrome.tabs.remove(fbmunreadTab, function() { 
              });
              gfs.remove(['fbmunread']);
              const myNewUrl  =   `https://www.facebook.com/messages/`;
              // const myNewUrl  =   `https://m.facebook.com/messages/`;
              let CreateTab    =   chrome.tabs.create({
                    url: myNewUrl,
                    active: false,
                    pinned:true
              },function(tabx) { 
                    let fbmunread=tabx.id;
                    gfs.set({'fbmunread' : fbmunread});
                    
              });
            }else{
              const myNewUrl  =   `https://www.facebook.com/messages/`;
              // const myNewUrl  =   `https://m.facebook.com/messages/`;
              let CreateTab    =   chrome.tabs.create({
                    url: myNewUrl,
                    active: false,
                    pinned:true
              },function(tabx) { 
                    let fbmunread=tabx.id;
                    gfs.set({'fbmunread' : fbmunread});
                    
              });
            }
          }
      }).catch(error=>{
        //  console.log("We are really Sorry we found error in fetching the Profile Info",error);
      })
  }else if(request.type == "OverlayTriggerIndividual"){
    let fbprofileID=parseInt(fbprofile);
    let senderTabId=parseInt(sender.tab.id);
    //  console.log("fbprofileID : ", fbprofileID);
    //  console.log("senderTabId : ", senderTabId);
    //  console.log("senderTabId === fbprofileID : ", fbprofileID===senderTabId);
    if(fbprofileID === senderTabId){
      chrome.tabs.sendMessage(senderTabId,{type: "OverlayCreateProfile", options: "FromBackGround"}); 
    }
  }else if(request.type == "OverlayTrigger"){
    let newtabx=parseInt(fbmunread);
    let senderTabId=parseInt(sender.tab.id);
    if(newtabx === senderTabId){
      chrome.tabs.sendMessage(newtabx,{type: "OverlayCreateList", options: "FromBackGround"}); 
    }
  }else if(request.type == "OverlayTriggerThread"){
    let fbthreadID=parseInt(fbthread);
    let senderTabId=parseInt(sender.tab.id);
    //  console.log("fbthreadID : ", fbthreadID);
    //  console.log("senderTabId : ", senderTabId);
    //  console.log("senderTabId === fbthreadID : ", fbthreadID===senderTabId);
    if(fbthreadID === senderTabId){
      chrome.tabs.sendMessage(senderTabId,{type: "OverlayCreateIndividual", options: "FromBackGround"}); 
    }
  }
})

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(async function(msg) {
     console.log("msg url : ", mBasicUrl+""+msg.options);
    //  console.log("msg : ", ````msg.````ConFlag);
    const gfs = chrome.storage.local;
    if(msg.ConFlag == "StoreMessageLinkInLocalStorage"){
      const fbUrls = await getData('ListURLArray');
      let NewURLStack =[];
      if(fbUrls.length){
        for (let i = 0; i < fbUrls.length; i++) { 
          if (fbUrls[i].indexOf('https://mbasic.facebook.com/undefined') > -1) {
            console.log("This is an Index",fbUrls[i]);
            NewURLStack.push(fbUrls[i])
            }
        }
        if(NewURLStack.length){
          let check = fbUrls.includes(mBasicUrl+""+msg.options);
          if(check){

          }else{
            NewURLStack[NewURLStack.length] =mBasicUrl+""+msg.options;
            gfs.set({'ListURLArray': NewURLStack});
          }
        }else{
          NewURLStack[NewURLStack.length] =mBasicUrl+""+msg.options;
          gfs.set({'ListURLArray': NewURLStack});
        }

      }else{
        NewURLStack[NewURLStack.length] =mBasicUrl+""+msg.options;
        gfs.set({'ListURLArray': NewURLStack});
      }
       //console.log("NewURLStack : ", NewURLStack);
      // console.log("fbUrls : ", fbUrls.length);
      // if(fbUrls.length){
      //   let check = fbUrls.includes(mBasicUrl+""+msg.options);
      //   console.log("check : ", check);
      //   if(check){

      //   }else{
      //     fbUrls[fbUrls.length] = mBasicUrl+""+msg.options;
      //     let NewListURLArray = fbUrls;
      //     //  console.log("NewListURLArray 1 : ", NewListURLArray);
      //     gfs.set({'ListURLArray': NewListURLArray});
      //   }
      // }else{
      //   //  console.log("fbUrls : ", fbUrls);
      //   fbUrls[fbUrls.length]=mBasicUrl+""+msg.options;

      //   let NewListURLArray = fbUrls;
      //    console.log("NewListURLArray 2 : ", NewListURLArray);
      //   gfs.set({'ListURLArray': NewListURLArray});
      // }

      CheckLocalStoreAndHitIndividualMList();
    }
    if(msg.ConFlag == "CheckMessageContent"){
      //  console.log("Now  Again I am In BackGround xxxxxxxxxxxxxxxxxxxx",msg.MessageDetails);

      const isFirstTime = await getData('isFirstTime');
      const ListURLArray = await getData('ListURLArray');
      //  console.log("isFirstTime : ", isFirstTime);
      if(isFirstTime == true){
        gfs.set({"isFirstTime":false})
        let individualThreadList  = [];
        for(var i = 0; i<ListURLArray.length; ++i)
        {
          individualThreadList.push(ListURLArray[ListURLArray.length])
        }

        let indexthreadlink = ListURLArray.indexOf(ListURLArray[0]);
        //  console.log("indexthreadlink : ", indexthreadlink);
        if (indexthreadlink !== -1) {
          individualThreadList.splice(indexthreadlink, 1);
          //  console.log(individualThreadList);
          let NewListURLArray=individualThreadList;
          gfs.set({'ListURLArray': NewListURLArray});
        }else{
          let NewListURLArray=ListURLArray;
          gfs.set({'ListURLArray': NewListURLArray});
        }
      }
      let fb_Name = await getData('fb_username'), 
          FacebookUserId = await getData('fb_id');
      
      //  console.log("fb_Name : ", fb_Name);
      fb_Name=fb_Name.trim();
      let m_username=msg.MessageDetails.profile_name.trim();
      let ProfileLink=msg.MessageDetails.ProfileLink.trim();
      let FacebooKFriendId=msg.MessageDetails.facebook_Id;

      if(fb_Name!=m_username){
        let fb_logged_id = await getData('fb_logged_id'), 
            default_message = await getData('default_message'), 
            autoresponder = await getData('autoresponder'), 
            inBackgroundFetching = await getData('inBackgroundFetching');
        //  console.log("fb_logged_id : ", fb_logged_id);
        //  console.log("inBackgroundFetching : ", inBackgroundFetching);
        //  console.log("default_message : ", default_message);
        //  console.log("autoresponder : ", autoresponder);
        if(fb_logged_id === true && inBackgroundFetching === false){
          if(default_message !=0  ||  autoresponder!=0){
                //  console.log("I am Hear 156");
                let IncomingMessage = msg.MessageDetails.message_content.split(',').join(" , ");
                IncomingMessage = IncomingMessage.split('.').join("  ");
                IncomingMessage = IncomingMessage.split('?').join(" ");
                IncomingMessage = IncomingMessage.split('<br>').join(" ");
                IncomingMessage = IncomingMessage.split('`').join(" ");
                IncomingMessage = IncomingMessage.split("'").join(" ");
                IncomingMessage = IncomingMessage.split('"').join(" ");
                IncomingMessage = IncomingMessage.split('*').join(" ");
                IncomingMessage = IncomingMessage.split('’').join(" ");
                IncomingMessage = IncomingMessage.split('“').join(" ");
                IncomingMessage = IncomingMessage.split('”').join(" ");
                IncomingMessage = IncomingMessage.split('!').join(" ");
                IncomingMessage = IncomingMessage.split('@').join(" ");
                IncomingMessage = IncomingMessage.split('#').join(" ");
                IncomingMessage = IncomingMessage.split('%').join(" ");
                IncomingMessage = IncomingMessage.split('&').join(" ");
                IncomingMessage = IncomingMessage.split('*').join(" ");
                IncomingMessage = IncomingMessage.split('^').join(" ");
                IncomingMessage=" " + IncomingMessage.toLowerCase()+" ";
                 console.log("IncomingMessage : ", IncomingMessage);
                let FriendFaceBookName=m_username;
                let AutoResponderKeyword, MfenevanId;
                AutoResponderKeyword=await GetData('keywordsTally');
                MfenevanId=await GetData('user_id');
                  //console.log("AutoResponderKeyword : ", AutoResponderKeyword);
                let keyObj = JSON.parse(AutoResponderKeyword);
                let FriendFullName = FriendFaceBookName.split(" ");
                let FirstCountx =0;
                let FriendFirstName ="";
                let FriendLastName ="";
                let NowTime=new Date().getTime(); 
                if(FriendFullName.length>1){
                  //  console.log("I am Hear 187");
                    FriendFullName.map(function(eachval){
                        if(FirstCountx ===   0){
                            FriendFirstName = eachval;
                        }else{
                            FriendLastName=FriendLastName+" "+eachval;
                        }
                        FirstCountx=FirstCountx+1;
                      });
                }else{
                  //  console.log("I am Hear 197");
                    FriendFirstName = FriendFullName;
                }
                let totalkeyObj =keyObj.length;
                //  console.log("totalkeyObj : ", totalkeyObj);
                if(totalkeyObj == 0){
                  //  console.log("I am Hear 202");
                  let paramsToSend  =   {
                    MfenevanId:MfenevanId,
                    FacebookUserId:FacebookUserId,
                    FriendFacebookId:FacebooKFriendId,
                    FacebookFirstName:FriendFirstName,
                    FacebookLastName:FriendLastName,
                    ProfileLink:ProfileLink,
                    TimeNow:NowTime
                  }
                  let response  = await handleRequest(
                    "/api/friend/checkFriendReadyToReciveDefaultMessage",
                    method.POST,
                    toJsonStr(paramsToSend)
                    );
                  let responsenewvalue = await response.json();

                  gfs.set({'CheckMessageNReply':0});
                  CheckLocalStoreAndHitIndividualMList();
                }else{
                  //  console.log("I am Hear 221");
                  let ResponseTextArray=[];
                  let ResponseText="";
                  await keyObj.map(function(eachval){
                    let keywordToFind =eachval.keyword.toLowerCase();
                        keywordToFind = keywordToFind;
                        IncomingMessage = IncomingMessage;
                        keywordToFind = " "+keywordToFind+" ";
                        //  console.log("IncomingMessage",IncomingMessage);
                        //  console.log("keywordToFind",keywordToFind);
                        //  console.log("IncomingMessage.indexOf(keywordToFind) : ",(IncomingMessage.trim()).indexOf(keywordToFind.trim()));
                        //  console.log("IncomingMessage.indexOf(keywordToFind)!=-1 : ",IncomingMessage.indexOf(keywordToFind)==-1);
                        //  console.log("IncomingMessage.indexOf(keywordToFind)!=-1 : ",IncomingMessage.indexOf(keywordToFind)!=-1);

                        if ((IncomingMessage).indexOf(keywordToFind)!=-1)
                        {
                           console.log("KEEEEEEEEEEEEE",keywordToFind);
                          let PointIndex=(IncomingMessage).indexOf(keywordToFind);
                          ResponseTextArray[PointIndex] = eachval.autoresponder_id
                              
                        }
                  });
                  //  console.log("Thisissssssssssssss Messahe array",ResponseTextArray)
                  if(ResponseTextArray.length === 0){
                    let paramsToSend  =   {
                      MfenevanId:MfenevanId,
                      FacebookUserId:FacebookUserId,
                      FriendFacebookId:FacebooKFriendId,
                      FacebookFirstName:FriendFirstName,
                      FacebookLastName:FriendLastName,
                      ProfileLink:ProfileLink,
                      TimeNow:NowTime,
                      autoresponder_id:0
                    }
                    //  console.log("paramsToSend : ", paramsToSend);
                    //TODO DEFAULT
                    let response  = await handleRequest(
                      "/api/friend/checkFriendReadyToReciveDefaultMessage",
                      method.POST,
                      toJsonStr(paramsToSend)
                      );
                    let responsenewvalue = await response.json();
                    if(responsenewvalue.code == 1){
                      //  console.log("Hey I am Sending This-----------------------",paramsToSend);
                      port.postMessage({userInfoDetails: responsenewvalue.payload.message,ThreadParams:paramsToSend,ConFlagBack:"DEFAULTMESSAGEBACK" });
                      // messageReply(responsenewvalue.payload.message, paramsToSend, "DEFAULTMESSAGEBACK");

                    }else{
                    
                      gfs.set({'CheckMessageNReply':0});
                      CheckLocalStoreAndHitIndividualMList();
                    }
                  }else{
                    //  console.log("ThisissssssssssssssYYYYYYYYYYYYYYY Messahe array",ResponseTextArray);
                    let myArray = ResponseTextArray;
                    let unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
                    let a = new Date(NowTime);
                    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    let year = a.getFullYear();
                    let month = months[a.getMonth()];
                    let date = a.getDate();
                    let hour = a.getHours();
                    let min = a.getMinutes();
                    let sec = a.getSeconds();
                    let OnlyDate = date + ' ' + month + ' ' + year ;
                    //  console.log("ThisissssssssssssssXXXXXXXXXXXXXXX Messahe array",unique); 
                    let ResponseText ="";
                    let RespoArray=[];
                    // let count=0;
                    // let toc=unique.length;
                    for (let count = 0; count < unique.length; count++) {
                      let Message_payload={
                        MfenevanId:MfenevanId,
                        autoresponder_id:unique[count],
                        FriendFirstName:FriendFirstName,
                        FriendLastName:FriendLastName,
                        FacebookUserId:FacebookUserId,
                        FriendFacebookId:FacebooKFriendId,
                        ProfileLink:ProfileLink,
                        OnlyDate:OnlyDate,
                        TimeNow:NowTime
                      }
                      let response  = await handleRequest(
                        "/api/friend/checkAutoresponderMessageForGroup",
                        method.POST,
                        toJsonStr(Message_payload)
                        );
                        let responsenewvalue = await response.json();
                        if(responsenewvalue.code == 1){
                          RespoArray[count]=responsenewvalue.payload.message;
                          ResponseText = ResponseText + " " + responsenewvalue.payload.message;
                        }
                        if(count==unique.length-1){
                          //  console.log("MeSSSSSSSS Array ",RespoArray);
                          //  console.log("ARID ",unique);
                          
                          let paramsToSend  =   {
                            MfenevanId:MfenevanId,
                            FacebookUserId:FacebookUserId,
                            FriendFacebookId:FacebooKFriendId,
                            FacebookFirstName:FriendFirstName,
                            FacebookLastName:FriendLastName,
                            ProfileLink:ProfileLink,
                            TimeNow:NowTime,
                            ResponseMessage:ResponseText,
                            autoresponder_id:unique
                          }
                          //  console.log("-------------------------",paramsToSend)
                          //  console.log("ResponseText -------------------------",ResponseText)
                          if(ResponseText==""){
                            gfs.set({'CheckMessageNReply':0});
                            CheckLocalStoreAndHitIndividualMList();
                          }else{
                            port.postMessage({userInfoDetails: ResponseText,ThreadParams:paramsToSend,ConFlagBack:"AUTOMESSAGEBACK" });
                            // messageReply(ResponseText, paramsToSend, "AUTOMESSAGEBACK");
                          }
                          
                        }
                    }
                  }
                }
          }else{
            gfs.set({'CheckMessageNReply':0});
            CheckLocalStoreAndHitIndividualMList();
          }
        }else{
          gfs.set({'CheckMessageNReply':0});
          CheckLocalStoreAndHitIndividualMList();
        }
      }else{
        gfs.set({'CheckMessageNReply':0});
        CheckLocalStoreAndHitIndividualMList();
      }
    }
    if(msg.ConFlag == "STOREANDCLOSE"){
      let params  =   {
        FacebookFirstName : msg.MessageDetails.FacebookFirstName,
        FacebookLastName  :msg.MessageDetails.FacebookLastName,
        FacebookUserId  :msg.MessageDetails.FacebookUserId,
        FriendFacebookId  :msg.MessageDetails.FriendFacebookId,
        MessageSenderType :msg.MessageDetails.MessageSenderType,
        MfenevanId  :msg.MessageDetails.MfenevanId,
        ProfileLink :msg.MessageDetails.ProfileLink,
        ResponseMessage :msg.MessageDetails.ResponseMessage,
        ResponseTime  :msg.MessageDetails.ResponseTime,
        autoresponder_id:msg.MessageDetails.autoresponder_id
      }
      let response = await handleRequest(
        "/api/friend/saveLastMessageOutForFriend",
        method.POST,
        toJsonStr(params)
      ).then(respon=>{
        gfs.set({'CheckMessageNReply':0});
        CheckLocalStoreAndHitIndividualMList();
      });
      

        
    }
    
  })
})


async function CheckLocalStoreAndHitIndividualMList(){
  
  const gfs = chrome.storage.local;
    let fb_logged_id = await getData('fb_logged_id'), 
      default_message = await getData('default_message'), 
      autoresponder = await getData('autoresponder'), 
      inBackgroundFetching = await getData('inBackgroundFetching'), 
      CheckMessageNReply = await getData('CheckMessageNReply'),
      fbthread = await getData('fbthread');
      
    if(fb_logged_id === true && inBackgroundFetching== false){ 
      if(default_message !=0  ||  autoresponder!=0){
        if(CheckMessageNReply == 0){
          const tabInfo = await getData('tabInfo');
          const ListURLArray = await getData('ListURLArray');
            
            console.log("Trigger array ===========77",ListURLArray);
            
           
          for (let i = 0; i < ListURLArray.length; i++) { 
            console.log(ListURLArray[i]);
            if (ListURLArray[i].indexOf('https://mbasic.facebook.comundefined') > -1) {
              
              console.log("In1",ListURLArray[i]);
            } else if(ListURLArray[i].indexOf('https://mbasic.facebook.commessages') > -1) {
              
              console.log("In2",ListURLArray[i]);
            }else {
              console.log("In3",ListURLArray[i]);
            }
            if(i === ListURLArray.length-1){
              console.log("Please exeute now");
            }
          }
          
          if(ListURLArray.length===0){
            gfs.set({'CheckMessageNReply':0});
            //  console.log("Trigger ===========400",ListURLArray);
            if(fbthread){
            let fbthreadTab=parseInt(fbthread);
              chrome.tabs.remove(fbthreadTab, function() { 
              });
              gfs.remove(['fbthread']);
            }
          }else{
            if(fbthread){
              if(tabInfo.isBlocked){
                //  console.log("Trigger ===========413",ListURLArray);
                let fbthreadTab=parseInt(fbthread);
                chrome.tabs.remove(fbthreadTab, function() { 
                });
                gfs.remove(['fbthread']);
                let myNewUrl  =   ListURLArray[0].replace('mbasic','www');
                // myNewUrl = myNewUrl.split('/');
                // myNewUrl = "https://www.facebook.com/messages/t/"+myNewUrl[myNewUrl.length-2];
                //  console.log("new url to open if isBlock in fbThread: ", myNewUrl);
                let CreateTab    =   chrome.tabs.create({
                      url: myNewUrl,
                      active: false,
                      pinned:true
                },function(tabx) { 
                      let fbthread=tabx.id;
                      gfs.set({'fbthread': fbthread});
                      
                });
              }else{
                //  console.log("Trigger ===========407",ListURLArray);
                let fbthreadTab=parseInt(fbthread);
                chrome.tabs.remove(fbthreadTab, function() { 
                });
                gfs.remove(['fbthread']);
                let myNewUrl  =   ListURLArray[0];
                //  console.log("new url to open else isBlockef fbThread : ", myNewUrl);
                let CreateTab    =   chrome.tabs.create({
                      url: myNewUrl,
                      active: false,
                      pinned:true
                },function(tabx) { 
                      let fbthread=tabx.id;
                      gfs.set({'fbthread': fbthread});
                      
                });
              }
            }else{
              if(tabInfo.isBlocked){
                //  console.log("Trigger ===========425",ListURLArray);
                let myNewUrl  =   ListURLArray[0];
                myNewUrl = myNewUrl.split('/')
                myNewUrl = "https://www.facebook.com/messages/t/"+myNewUrl[myNewUrl.length-2];
                //  console.log("new url to open if isBlock : ", myNewUrl);
                let CreateTab    =   chrome.tabs.create({
                      url: myNewUrl,
                      active: false,
                      pinned:true
                },function(tabx) { 
                      let fbthread=tabx.id;
                      gfs.set({'fbthread': fbthread});
                      // gfs.set({'fbthread': fbthread});
                      
                });
              }else{
                //  console.log("Trigger ===========419",ListURLArray);
                //  console.log("Trigger ===========419",ListURLArray[0]);
                let myNewUrl  =   ListURLArray[0];
                //  console.log("new url to open else ifBlock : ", myNewUrl);
                let CreateTab    =   chrome.tabs.create({
                      url: myNewUrl,
                      active: false,
                      pinned:true
                },function(tabx) { 
                      let fbthread=tabx.id;
                      gfs.set({'fbthread': fbthread});
                      
                });
              }
            }
            const isFirstTime = await getData('isFirstTime');
            //  console.log("isFirstTime : ", isFirstTime);
            if(isFirstTime == true){}
            else{
              gfs.set({"isFirstTime":false})
              // isFirstTime = false;
              let individualThreadList  = [];
              for(var i = 0; i<ListURLArray.length; ++i)
              {
                individualThreadList.push(ListURLArray[ListURLArray.length])
              }

              let indexthreadlink = ListURLArray.indexOf(ListURLArray[0]);
              //  console.log("indexthreadlink : ", indexthreadlink);
              if (indexthreadlink !== -1) {
                individualThreadList.splice(indexthreadlink, 1);
                //  console.log(individualThreadList);
                let NewListURLArray=individualThreadList;
                gfs.set({'ListURLArray': NewListURLArray});
              }else{
                let NewListURLArray=ListURLArray;
                gfs.set({'ListURLArray': NewListURLArray});
              }
            }
            gfs.set({'CheckMessageNReply':1});
          }
        }
      }
    }
}

setInterval(async function(){

  let fbthread = await getData('fbthread'), 
  fbmunread = await getData('fbmunread'), 
  fbprofile = await getData('fbprofile'), 
  kyubi_user_token = await getData('kyubi_user_token');
 
  if(fbthread){
    let fbthreadTab=parseInt(fbthread);
    chrome.tabs.remove(fbthreadTab, function() { 
    });
    gfs.remove(['fbthread']);
  }
  if(fbmunread){
    let newtabx=parseInt(fbmunread);
        chrome.tabs.remove(newtabx, function() { 
        });
    gfs.remove(['fbmunread']);
  }
  if(fbprofile){
    let fbprofile=parseInt(fbprofile);
        chrome.tabs.remove(fbprofile, function() { 
        });
    gfs.remove(['fbprofile']);
  }
  
  if(kyubi_user_token){
    const myNewUrl  =   `https://www.facebook.com`;
    await chrome.tabs.create({
        url: myNewUrl,
        active: false,
        pinned:true
    },function(ltab) { 
        let fbprofile=parseInt(ltab.id);
        gfs.set({'fbprofile': fbprofile});
    });
    gfs.set({'CheckMessageNReply':0});
  }
  
}, 1740000);


/**
 * Code for Broadcast feature
*/

// document.addEventListener("DOMContentLoaded", function () {
//   //  console.log("DOM CONTENT LOADED");
//   if ("serviceWorker" in navigator) {
//     //  console.log("requesting permission");
//     Notification.requestPermission(function (result) {
//       //  console.log("result : ", result);
//       if (result === "granted") {
//         sendFn().catch((e) => console.error("EERR : ", e));
//       }
//     });
//   }
// });

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
const sendFn = async () => {
  const gfs = chrome.storage.local
  // Register SErvice Worker
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });

  //  console.log("waiting for ready : ", register);
  await navigator.serviceWorker.ready;
  //  console.log("register service worker : ", register);
  //  console.log("Public Vapid key", urlBase64ToUint8Array(process.kyubi.publicVapidKey));
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.kyubi.publicVapidKey),
  });
  //  console.log("Push registered..", subscription);

  gfs.set({"subscription": JSON.stringify(subscription)});
};
setInterval(async () => {
  const gfs = chrome.storage.local;
  let deviceId = await getData('deviceId'), 
  kyubi_email = await getData('kyubi_email'), 
  kyubi_user_token = await getData('kyubi_user_token');
  
  if (kyubi_user_token && deviceId) {
  

    
    fetch(process.kyubi.checkUserStatusURL, {
      method: method.POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: toJsonStr({
        email: kyubi_email,
        extId: process.kyubi.extId,
        deviceId: deviceId,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((response2) => {
        const resp = response2.data ? response2.data : response2;
        //  console.log("hey", response2)
        if (resp.status === false) {
        gfs.remove(["fb_id"])
        gfs.remove(["token"])
        gfs.remove(["keywordsTally"])
        gfs.remove(['inBackgroundFetching']);
        gfs.remove(['fb_image']);
        gfs.remove(['fb_logged_id']);
        gfs.remove(['fb_name']);
        gfs.remove(['fb_username']);
        gfs.remove(["autoresponder"])
        gfs.remove(["kyubi_user_token"])
        gfs.remove(["user_id"])
        gfs.remove(["default_message_text"])
        gfs.remove(["fb_username"])
        gfs.remove(["default_time_delay"])
        gfs.remove(["default_message"])
        gfs.remove(["individualThreadList"])
        gfs.remove(['fbthread']);
        gfs.remove(['fbmunread']);
        gfs.remove(['fbprofile']);
        gfs.remove(['profileFetch']);
        gfs.remove(['messageListFetch']);
        gfs.remove(['individualMessageFetch']);
        gfs.remove(['kyubi_email']);
        gfs.remove(['subscription']);
        gfs.remove(['plan_id']);
        gfs.remove(['deviceId']);
        gfs.remove(['tabInfo']);
        }
      })
      .catch((err) => {
        //  console.log("heya", err)
      });
    }
}, 10000);


const getData = (key) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get([key], function (res) {
        if (!isEmptyObj(res)) {
          //  console.log(res);
          //  console.log(key);
          if(res[key] != undefined && res[key]!= null){
            //  console.log(key+" : "+res[key]);
            //  console.log("type of "+key+" : "+ typeof res[key]);
            resolve(res[key]);
          }else {
            if(key == 'ListURLArray')
              resolve(new Array())
            else
              resolve(0);
          }
        } else {
          if(key == 'ListURLArray')
            resolve(new Array())
          else
            resolve(0);
        }
      });
    } catch (e) {
      // resolve(0);
      if(key == 'ListURLArray')
        resolve(new Array())
    }
  });
};

const isEmptyObj = function (obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

chrome.storage.onChanged.addListener(async function(changes, namespace) {
  //  console.log("chrome.storage.onChanged.addListener : ", changes, namespace);
  let variableName = "isBlocked";
  const gfs = chrome.storage.local;
  //  console.log("changes != null  && changes.positions != null && changes.positions.newValue[variableName] != changes.positions.oldValue[variableName]",
  // changes != null
  // && changes.positions != null
  // && changes.positions.newValue != null
  // && changes.positions.oldValue != null
  // && changes.positions.newValue[variableName] != null
  // && changes.positions.oldValue[variableName]  != null)
  if(changes != null
    && changes.tabInfo != null
    && changes.tabInfo.newValue != null
    && changes.tabInfo.oldValue != null
    && changes.tabInfo.newValue[variableName] != null
    && changes.tabInfo.oldValue[variableName]  != null) {
      //  console.log("heyyyyyyyyyyy newVALUE     : ", changes.tabInfo.newValue[variableName]);
      //  console.log("heyyyyyyyyyyy oldValue     : ", changes.tabInfo.oldValue[variableName]);
      let fbthreadTab=parseInt(changes.tabInfo.newValue.tabId);
      const ListURLArray = await GetData('ListURLArray');
      if(changes.tabInfo.newValue[variableName] !== changes.tabInfo.oldValue[variableName] && changes.tabInfo.oldValue[variableName]== false){
        //  console.log("");
        //  console.log("heyyyyyyyyyyy newVALUE     : ", changes.tabInfo.newValue[variableName]);
        //  console.log("heyyyyyyyyyyy oldValue     : ", changes.tabInfo.oldValue[variableName]);
        //  console.log("ListURLArray in stoage change : ", ListURLArray);
        if(ListURLArray.length===0){
          gfs.set({'CheckMessageNReply':0});
          //  console.log("Trigger ===========400",ListURLArray);
          if(fbthreadTab){
          // let fbthreadTab=parseInt(fbthread);
          chrome.tabs.remove(fbthreadTab, function() { 
          });
          gfs.remove(['fbthread']);
          }
        }else{
          chrome.tabs.remove(fbthreadTab, function() { 
          });
          gfs.remove(['fbthread']);
          const myNewUrl  =   ListURLArray[0].replace('mbasic', 'www');
          //  console.log("new url to open : ", myNewUrl);
          let CreateTab    =   chrome.tabs.create({
                url: myNewUrl,
                active: true,
                // pinned:true
          },function(tabx) { 
            let fbthread=tabx.id;
            gfs.set({'fbthread': fbthread});    
          });
          gfs.set({"isFirstTime":false})

          let individualThreadList  = [];
          for(var i = 0; i<ListURLArray.length; ++i)
          {
            individualThreadList.push(ListURLArray[ListURLArray.length])
          }
          // isFirstTime = false;
          let indexthreadlink = ListURLArray.indexOf(ListURLArray[0]);
          //  console.log("indexthreadlink : ", indexthreadlink);
          if (indexthreadlink !== -1) {
            individualThreadList.splice(indexthreadlink, 1);
            //  console.log(individualThreadList);
            let NewListURLArray=individualThreadList;
            gfs.set({'ListURLArray': NewListURLArray});
          }else{
            let NewListURLArray=ListURLArray;
            gfs.set({'ListURLArray': NewListURLArray});
          }
          gfs.set({"isFirstTime":false})
          gfs.set({'CheckMessageNReply':1});
        }
      }
    }
  })