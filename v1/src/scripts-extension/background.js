import { host } from '../config';
import { GetData } from '../helper/helper';
import {
  fbDtsg,
  fbAccessToken,
  ScrapFacebookFriends
  
} from "./backgroundHelpers";
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
console.log("Helllooooooooo");
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
//method: 'GET',
// mode: "cors", // no-cors, cors, *same-origin
// url: "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed",
// headers: {  
//         "baseURL": "https://www.facebook.com",
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Accept": "text/html,application/json",
//         "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
//}



  chrome.runtime.onMessageExternal.addListener(
    async function(request, sender, sendResponse) {
     console.log("This is the Sender",sender)
     console.log("This is the request",request)
     console.log("This is the sendResponse",sendResponse)
     if(request.type ==="GetUserFaceBookAuth"){   
      await fbDtsg(null, async (oldDataone, fbDtsgone, userIDone,parametersone) => {
        if(parametersone.LoggedInFacebook){
          await fbAccessToken(null, async (oldData, fbDtsg, userID,parameters) => {
            console.log("This is the Sender",parametersone);
            console.log("This is the Sender1111",fbDtsg);
            let UserFacebookDetails={
            user_id:request.options._id,
            kyubi_user_token :  request.options.kyubi_user_token,
            UserFacebookName: parametersone.FacebookName,
            UserFacebookid: parametersone.FacebookId,
            UserdtsgToken: parametersone.dtsg.token,
            UserFacebookImage:  parametersone.FacebookImage,
            UserFacebookUsername: parametersone.FacebookUsername,
            UserdtsgExpire: parametersone.dtsg.expire,
            access_token: fbDtsg
            }
            await handleRequest(
              "/api/user/CheckThenStoreProfileInfo",
              method.POST,
              toJsonStr(UserFacebookDetails)
            ).then(async response =>  {
            console.log("This is the Data I have To Send Back",response);
            let responsenewvalue = await response.json();
          }).catch(error=>{
            //  console.log("We are really Sorry we found error in fetching the Profile Info",error);
          })
            
          });
        }else{
          let UserFacebookDetails={
            user_id:request.options._id,
            kyubi_user_token :  request.options.kyubi_user_token,
            UserFacebookName: false,
            UserFacebookid: false,
            UserdtsgToken: false,
            UserFacebookImage:  false,
            UserFacebookUsername: false,
            UserdtsgExpire: false,
            access_token: false
            }
            await handleRequest(
              "/api/user/CheckThenStoreProfileInfo",
              method.POST,
              toJsonStr(UserFacebookDetails)
            ).then(async response =>  {
            console.log("This is the Data I have To Send Back",response);
            let responsenewvalue = await response.json();
          }).catch(error=>{
            //  console.log("We are really Sorry we found error in fetching the Profile Info",error);
          })
        }
      });
     }
     if(request.type  === "GetFacebookFriends"){
      let payload={
      dtsg:request.options.UserdtsgToken,
      FBuserId:request.options.UserFacebookid,
      kyubi_user_token: request.options.kyubi_user_token,
      User_id: request.options._id,
      cursor:request.options.end_cursor
      }
      
      await CallFacebookToGetFriends(payload);
      
     }
     
    });

    async function CallFacebookToGetFriends(payload){
      
      await ScrapFacebookFriends(payload).then(async result=>{
        console.log("This Is what I got from Facebook =============",result);
        if(result.success===true){
          let friendsArray = [];
          let Newpayload={}
          await result.friends.map(async EachFriends=>{
            friendsArray.push({ friend:EachFriends.node } )
            Newpayload={
              dtsg:payload.dtsg,
              FBuserId:payload.FBuserId,
              kyubi_user_token: payload.kyubi_user_token,
              User_id:payload.User_id,
              cursor:EachFriends.cursor
              }
          })
          if(result.has_next_page ===true){
                 let friendDetailsArray={
                  totalFriends:0,
                  friends:friendsArray,
                  kyubi_user_token:payload.kyubi_user_token,
                  User_id:payload.User_id,
                  has_next_page:result.has_next_page,
                  FBuserId:payload.FBuserId
                 }
                await handleRequest(
                    "/api/friend/StoreUserFriends",
                    method.POST,
                    toJsonStr(friendDetailsArray)
                  ).then(async response =>  {
                  console.log("This is the Data I have To Send Back",response);
                  let responsenewvalue = await response.json();
                }).catch(error=>{
                   console.log("We are really Sorry we found error in fetching the Profile Info",error);
                })
              await CallFacebookToGetFriends(Newpayload);
          }else{
            let friendDetailsArray={
              totalFriends:0,
              friends:friendsArray,
              kyubi_user_token:payload.kyubi_user_token,
              User_id:payload.User_id,
              has_next_page:result.has_next_page,
              FBuserId:payload.FBuserId
             }
                await handleRequest(
                    "/api/friend/StoreUserFriends",
                    method.POST,
                    toJsonStr(friendDetailsArray)
                  ).then(async response =>  {
                  console.log("This is the Data I have To Send Back",response);
                  let responsenewvalue = await response.json();
                }).catch(error=>{
                  console.log("We are really Sorry we found error in fetching the Profile Info",error);
                })
            console.log("This are the friends Request i have",friendsArray);
          }
        }
      });
    }

    

    

  