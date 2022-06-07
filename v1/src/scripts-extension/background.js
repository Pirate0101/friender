import { fetchCollectionToken, ScrapFacebookFriends } from "./backgroundHelpers";
import { fbDtsg, incomingFrndRequest, sentFrndRequest } from "./fbAPIs";
import toJsonStr from "./helper/toJsonStr";

const method = { POST: "post", GET: "get", PUT: "put", DELETE: "delete" };

chrome.storage.local.set({ "tabInfo": { "isBlocked": false, tabId: 0 }, "isFirstTime": true });

/** 
 * @handleRequest
 * This function will handle the https request
 * 
*/
const handleRequest = (path, methodType, bodyData) => {
  let getWithCredentialHeader = {
    'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': true
  };
  return fetch(process.kyubi.appBaseBackendUrl + path, {
    method: methodType,
    headers: getWithCredentialHeader,
    body: bodyData,
  });
};

chrome.runtime.onMessageExternal.addListener(
  async function (request, sender, sendResponse) {
    console.log("This is the Sender", sender)
    console.log("This is the request", request)
    console.log("This is the sendResponse", sendResponse)
    if (request.type === "GetUserFaceBookAuth") {
      fbDtsg(null, async (data) => {
        if (data.parameters.LoggedInFacebook) {
          console.log("GetUserFaceBookAuth: Logged in User Data", data.parameters);
          console.log("GetUserFaceBookAuth: DTSG", data.dtsg);
          let collectionToken = await fetchCollectionToken(data.parameters.dtsg.token, data.parameters.FacebookId, data.parameters.FacebookUsername);
          console.log("GetUserFaceBookAuth: Collection Token", collectionToken);
          let UserFacebookDetails = {
            user_id: request.options._id,
            kyubi_user_token: request.options.kyubi_user_token,
            UserFacebookName: data.parameters.FacebookName,
            UserFacebookid: data.parameters.FacebookId,
            UserdtsgToken: data.parameters.dtsg.token,
            UserFacebookImage: data.parameters.FacebookImage,
            UserFacebookUsername: data.parameters.FacebookUsername,
            UserdtsgExpire: data.parameters.dtsg.expire,
            access_token: data.dtsg.token,
            UsercollectionToken: collectionToken
          }

          await handleRequest(
            "/api/user/CheckThenStoreProfileInfo",
            method.POST,
            toJsonStr(UserFacebookDetails)
          ).then(async response => {
            console.log("GetUserFaceBookAuth: Response from server", response);
            await response.json();
          }).catch(error => {
            //  console.log("We are really Sorry we found error in fetching the Profile Info",error);
          })

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
            console.log("GetUserFaceBookAuth: Response from server in else part", response);
            await response.json();
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
      await CallBaseFacebookAPIToGetFriend(payload, false);

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
    if (request.type === "GetIncomingRequestDetails") {
      incomingFrndReq();
    }
    if (request.type === "GetSentRequestDetails") {
      outgoingFrndReq();
    }
  });

async function CallBaseFacebookAPIToGetFriend(payload, saveToDB = true) {
  await ScrapFacebookFriends(payload).then(async result => {
    console.log("GetFacebookFriends::CallBaseFacebookAPIToGetFriend ===>", result);
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
        if (saveToDB) {
          await handleRequest(
            "/api/friend/StoreUserFriends",
            method.POST,
            toJsonStr(friendDetailsArray)
          ).then(async response => {
            console.log("GetFacebookFriends::CallBaseFacebookAPIToGetFriend: Response from server", response);
            await response.json();
          }).catch(error => {
            console.log("GetFacebookFriends::CallBaseFacebookAPIToGetFriend: found error in fetching the Profile Info", error);
          })
        }
        await CallBaseFacebookAPIToGetFriend(Newpayload, saveToDB);
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
        if (saveToDB) {
          await handleRequest(
            "/api/friend/StoreUserFriends",
            method.POST,
            toJsonStr(friendDetailsArray)
          ).then(async response => {
            console.log("GetFacebookFriends::CallBaseFacebookAPIToGetFriend: Response from server to save data after last data from facebook", response);
            await response.json();
            let SlowNewpayload = {
              dtsg: payload.dtsg,
              FBuserId: payload.FBuserId,
              kyubi_user_token: payload.kyubi_user_token,
              User_id: payload.User_id,
              cursor: null,
              collectionToken: payload.collectionToken,
              profileId: payload.profileId
            }
            console.log("SlowNewpayload", SlowNewpayload);
            await CallSlowFacebookAPIToGetFriend(SlowNewpayload);
          }).catch(error => {
            console.log("We are really Sorry we found error in fetching the Profile Info", error);
          })
        } else {
          Newpayload.cursor = null;
          await CallBaseFacebookAPIToGetFriend(Newpayload);
        }
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

const incomingFrndReq = () => {
  fbDtsg(null, (data) => {
    console.log("here", data)
    if (data.dtsg && data.dtsg.token) {
      incomingFrndRequest(null, data.dtsg.token, (reqData) => {
        console.log(reqData)
      });
    }
  });
}

const outgoingFrndReq = () => {
  fbDtsg(null, (data) => {
    if (data.dtsg && data.dtsg.token) {
      sentFrndRequest(null, data.dtsg.token, (reqData) => {
        console.log(reqData)
      });
    }
  });
}

incomingFrndReq();

outgoingFrndReq();



