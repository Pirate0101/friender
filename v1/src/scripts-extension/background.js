import { host } from '../config';
import {
  fbAccessToken, fbDtsg, fetchCollectionToken, getAboutFriend, ScrapSlowFacebookFriends
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
chrome.storage.local.set({ "tabInfo": { "isBlocked": false, tabId: 0 } })
chrome.storage.local.set({ "isFirstTime": true })
/** 
 * @handleRequest
 * this function will handel the https request
 * 
*/
console.log("Helllooooooooo");
const handleRequest = (path, methodType, bodyData) => {
  let getWithCredentialHeader = {
    'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true
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
  async function (request, sender, sendResponse) {
    console.log("This is the Sender", sender)
    console.log("This is the request", request)
    console.log("This is the sendResponse", sendResponse)
    if (request.type === "GetUserFaceBookAuth") {
      await fbDtsg(null, async (oldDataone, fbDtsgone, userIDone, parametersone) => {
        if (parametersone.LoggedInFacebook) {
          await fbAccessToken(null, async (oldData, fbDtsg, userID, parameters) => {
            console.log("This is the Sender", parametersone);
            console.log("This is the Sender1111", fbDtsg);
            let collectionToken = await fetchCollectionToken(parametersone.dtsg.token, parametersone.FacebookId, parametersone.FacebookUsername);
            console.log("This is the Senderxxxxxxx", collectionToken);
            let UserFacebookDetails = {
              user_id: request.options._id,
              kyubi_user_token: request.options.kyubi_user_token,
              UserFacebookName: parametersone.FacebookName,
              UserFacebookid: parametersone.FacebookId,
              UserdtsgToken: parametersone.dtsg.token,
              UserFacebookImage: parametersone.FacebookImage,
              UserFacebookUsername: parametersone.FacebookUsername,
              UserdtsgExpire: parametersone.dtsg.expire,
              access_token: fbDtsg,
              UsercollectionToken: collectionToken
            }

            await handleRequest(
              "/api/user/CheckThenStoreProfileInfo",
              method.POST,
              toJsonStr(UserFacebookDetails)
            ).then(async response => {
              console.log("This is the Data I have To Send Back", response);
              let responsenewvalue = await response.json();
            }).catch(error => {
              //  console.log("We are really Sorry we found error in fetching the Profile Info",error);
            })

          });

        } else {
          let UserFacebookDetails = {
            user_id: request.options._id,
            kyubi_user_token: request.options.kyubi_user_token,
            UserFacebookName: false,
            UserFacebookid: false,
            UserdtsgToken: false,
            UserFacebookImage: false,
            UserFacebookUsername: false,
            UserdtsgExpire: false,
            access_token: false
          }
          await handleRequest(
            "/api/user/CheckThenStoreProfileInfo",
            method.POST,
            toJsonStr(UserFacebookDetails)
          ).then(async response => {
            console.log("This is the Data I have To Send Back", response);
            let responsenewvalue = await response.json();
          }).catch(error => {
            //  console.log("We are really Sorry we found error in fetching the Profile Info",error);
          })
        }
      });
    }
    if (request.type === "GetFacebookFriends") {
      let payload = {
        dtsg: request.options.UserdtsgToken,
        FBuserId: request.options.UserFacebookid,
        kyubi_user_token: request.options.kyubi_user_token,
        User_id: request.options._id,
        cursor: request.options.end_cursor,
        collectionToken: request.options.UsercollectionToken,
        profileId: request.options.UserProfileId
      }
      await CallBaseFacebookAPIToGetFriend(payload);

      // await CallFacebookToGetFriends(payload);

    }
    if (request.type === "GetFriendsFaceBookDetails") {
      console.log(request.options);
      await request.options.map(async (friendBase, key) => {
        //console.log("This is the Key",key)

        if (key === 20) {
          console.log("This is the Friend Info", friendBase)
          //fetchFacebookFriendDetails(friendBase);
          await getAboutFriend(friendBase);
        }
      })

      // await CallFacebookToGetFriends(payload);

    }

  });
async function CallBaseFacebookAPIToGetFriend(payload) {
  await ScrapSlowFacebookFriends(payload).then(async result => {
    console.log("This Is what I got from Facebook =============", result);
    if (result.success === true) {
      let friendsArray = [];
      let Newpayload = {}
      await result.friends.map(async EachFriends => {
        friendsArray.push({ friend: EachFriends.node })
        Newpayload = {
          dtsg: payload.dtsg,
          FBuserId: payload.FBuserId,
          kyubi_user_token: payload.kyubi_user_token,
          User_id: payload.User_id,
          cursor: EachFriends.cursor,
          collectionToken: payload.collectionToken,
          profileId: payload.profileId
        }
      })
      if (result.has_next_page === true) {
        let friendDetailsArray = {
          totalFriends: 0,
          friends: friendsArray,
          kyubi_user_token: payload.kyubi_user_token,
          User_id: payload.User_id,
          has_next_page: result.has_next_page,
          FBuserId: payload.FBuserId,
          profileId: payload.profileId
        }
        await handleRequest(
          "/api/friend/StoreUserFriends",
          method.POST,
          toJsonStr(friendDetailsArray)
        ).then(async response => {
          console.log("This is the Data I have To Send Back", response);
          let responsenewvalue = await response.json();
        }).catch(error => {
          console.log("We are really Sorry we found error in fetching the Profile Info", error);
        })
        await CallBaseFacebookAPIToGetFriend(Newpayload);
      } else {
        let friendDetailsArray = {
          totalFriends: 0,
          friends: friendsArray,
          kyubi_user_token: payload.kyubi_user_token,
          User_id: payload.User_id,
          has_next_page: result.has_next_page,
          FBuserId: payload.FBuserId,
          profileId: payload.profileId
        }
        await handleRequest(
          "/api/friend/StoreUserFriends",
          method.POST,
          toJsonStr(friendDetailsArray)
        ).then(async response => {
          console.log("This is the Data I have To Send Back", response);
          let responsenewvalue = await response.json();
          let SlowNewpayload = {
            dtsg: payload.dtsg,
            FBuserId: payload.FBuserId,
            kyubi_user_token: payload.kyubi_user_token,
            User_id: payload.User_id,
            cursor: null,
            collectionToken: payload.collectionToken,
            profileId: payload.profileId
          }
          console.log("dsdddddddddddddd",SlowNewpayload);
          // await CallSlowFacebookAPIToGetFriend(SlowNewpayload);
        }).catch(error => {
          console.log("We are really Sorry we found error in fetching the Profile Info", error);
        })
        console.log("This are the friends Request i have", friendsArray);
      }
    }
  });

}
async function CallSlowFacebookAPIToGetFriend(payload) {

  await ScrapSlowFacebookFriends(payload).then(async result => {
    console.log("This Is what I got from Facebook =============", result);
    if (result.success === true) {
      let friendsArray = [];
      let Newpayload = {}
      await result.friends.map(async EachFriends => {
        friendsArray.push({ friend: EachFriends.node })
        Newpayload = {
          dtsg: payload.dtsg,
          FBuserId: payload.FBuserId,
          kyubi_user_token: payload.kyubi_user_token,
          User_id: payload.User_id,
          cursor: EachFriends.cursor,
          collectionToken: payload.collectionToken,
          profileId: payload.profileId
        }
      })
      if (result.has_next_page === true) {
        let friendDetailsArray = {
          totalFriends: 0,
          friends: friendsArray,
          kyubi_user_token: payload.kyubi_user_token,
          User_id: payload.User_id,
          has_next_page: result.has_next_page,
          FBuserId: payload.FBuserId,
          profileId: payload.profileId
        }
        await handleRequest(
          "/api/friend/StoreUserFriends",
          method.POST,
          toJsonStr(friendDetailsArray)
        ).then(async response => {
          console.log("This is the Data I have To Send Back", response);
          let responsenewvalue = await response.json();
        }).catch(error => {
          console.log("We are really Sorry we found error in fetching the Profile Info", error);
        })
        await CallSlowFacebookAPIToGetFriend(Newpayload);
      } else {
        let friendDetailsArray = {
          totalFriends: 0,
          friends: friendsArray,
          kyubi_user_token: payload.kyubi_user_token,
          User_id: payload.User_id,
          has_next_page: result.has_next_page,
          FBuserId: payload.FBuserId
        }
        await handleRequest(
          "/api/friend/StoreUserFriends",
          method.POST,
          toJsonStr(friendDetailsArray)
        ).then(async response => {
          console.log("This is the Data I have To Send Back", response);
          let responsenewvalue = await response.json();
          let SlowNewpayload = {
            dtsg: payload.dtsg,
            FBuserId: payload.FBuserId,
            kyubi_user_token: payload.kyubi_user_token,
            User_id: payload.User_id,
            cursor: null,
            collectionToken: payload.collectionToken,
            profileId: payload.profileId
          }
          //await CallSlowFacebookAPIToGetFriend(SlowNewpayload);
        }).catch(error => {
          console.log("We are really Sorry we found error in fetching the Profile Info", error);
        })
        console.log("This are the friends Request i have", friendsArray);
      }
    }
  });
}





