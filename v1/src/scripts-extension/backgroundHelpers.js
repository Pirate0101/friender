/**
 * Getting the fb_dtsg from m.facebook.com
 */
 const fbDtsg = (data, callback = null, responseBack = null, saveToStorage = false) => {
    fetch("https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed", {
      method: "GET",
    })
      .then((e) => e.text())
      .then((e) => {
        let sugest, dtsg, UserFacebookUsername = "", UserFacebookName = "", UserFacebookid = "", UserFacebookImage = "", UserLoggedInFacebook = false;
                const regex3 = /\\"suggestions\\":\[\{[^}]*\}/gm;
                const regex4 = /\\"dtsg\\":\{[^}]*\}/gm;
                if (e.match(regex4)!= null) {
                    // console.log("it is true");

                    dtsg = e.match(regex4)[0];

                    dtsg = "{" + dtsg.replace(/[\\]/g, "") + "}";
                    // console.log("dtsg in login helper 2", dtsg);

                    dtsg = JSON.parse(dtsg).dtsg;
                    // console.log("dtsg in login helper 3", dtsg);
                }
                console.log("dtsg : ", dtsg);
                //chrome.storage.local.set({"dtsg" : dtsg});

                if (regex3.test(e)) {
                    sugest = e.match(regex3)[0];
                    sugest = "{" + sugest.replace(/[\\]/g, "") + "]}"
                    sugest = JSON.parse(sugest).suggestions[0]
                     console.log("sugest in login helper", sugest);
                    setTimeout(()=>{
                        UserFacebookid = sugest.uid;
                        UserFacebookUsername = sugest.path.replace('/', '');
                        UserFacebookName = sugest.text;
                        UserFacebookImage = sugest.photo;
                        UserLoggedInFacebook = true;
                        let parameters={
                            FacebookId : UserFacebookid,
                            FacebookUsername : UserFacebookUsername,
                            FacebookName : UserFacebookName,
                            FacebookImage  : UserFacebookImage,
                            LoggedInFacebook  : UserLoggedInFacebook,
                            dtsg:dtsg
                        }
                         console.log("parameters : ", parameters);
                         callback(data, dtsg, sugest, parameters);
                        //chrome.runtime.sendMessage({type: "storeUserInfoOrQueryThenStore", options: parameters});
                    },500)
                }else {
                    UserLoggedInFacebook = false;
                    let parameters={
                        FacebookId : UserFacebookid,
                        FacebookUsername : UserFacebookUsername,
                        FacebookName : UserFacebookName,
                        FacebookImage  : UserFacebookImage,
                        LoggedInFacebook  : UserLoggedInFacebook,
                        dtsg:dtsg
                    }
                     console.log("parameters : ", parameters);
                     callback(data, dtsg, sugest, parameters);
                     
                    //chrome.runtime.sendMessage({type: "storeUserInfoOrQueryThenStore", options: parameters});
                }
      })
      .catch(() => {
        if (callback) {
          callback(data, null, responseBack);
        }
      });
  };
/**
 * Getting the fb_access_token from m.facebook.com
 */
 const fbAccessToken = (data, callback = null, responseBack = null, saveToStorage = false) => {
    fetch("https://business.facebook.com/creatorstudio/home", {
      method: "GET",
      mode: "cors", // no-cors, cors, *same-origin
      headers: {  
        "authority": "business.facebook.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "text/html,application/json"
    }
    })
      .then((e) => e.text())
      .then((e) => {
        const match = e.match(/"userAccessToken":"(.*?)"/);
        if (match && Array.isArray(match)) {
            let accessToken = match[1];
            callback(match, accessToken,null,null);
        } 
      })
      .catch(() => {
        if (callback) {
          callback(data, null, responseBack);
        }
      });
  };
/**
 * Getting the fb_access_token from m.facebook.com
 */
  const  facebookFriendScraper = async (accessToken=string,    userId=string,    dtsg=string,    cursor= null,    analyze = false,    createNew = true,    tried = "no") =>{
    var data = {
      av: userId,
      __user: userId,
      __a: 1,
      dpr: 1,
      fb_dtsg: dtsg,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "FriendingCometFriendsListPaginationQuery",
      variables: JSON.stringify({
        count: 30,
        cursor: cursor,
        name: null,
        scale: 1,
      }),
      server_timestamps: true,
      doc_id: 4268740419836267,
    };
    var a = await fetch("https://www.facebook.com/api/graphql/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "text/html,application/json",
            "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
          },
          body: this.serializeFBReq(data),
        });
        var response = await a.json();
        console.log("This are the response",response);

  }
  const ScrapFacebookFriends=  async  function    (payload)   {
    let serilizedDataNew= await serializeFBFriendReq(payload.FBuserId,payload.dtsg,payload.cursor);
    console.log(serilizedDataNew);
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            fetch("https://www.facebook.com/api/graphql/", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "text/html,application/json",
            "x-fb-friendly-name": "ProfileCometTimelineFeedRefetchQuery",
            },
            body: serilizedDataNew,
            }).then(async result=>{
                let resp = await result.json();
              if (resp.hasOwnProperty("data")) {
                  console.log("==========3==================",resp.data);
                  if (resp.data.hasOwnProperty("viewer")) {
                      console.log("==========4==================",resp.data.viewer);
                      if (resp.data.viewer.hasOwnProperty("all_friends")) {
                          console.log("===========5=================",resp.data.viewer.all_friends);
                          
                          if (resp.data.viewer.hasOwnProperty("all_friends")) {
                              if (resp.data.viewer.all_friends.hasOwnProperty("edges")) {
                                  if (resp.data.viewer.all_friends.hasOwnProperty("page_info")) {
                                      resolve({
                                          'success':true,
                                          'count':0,
                                          'kyubi_user_token':payload.kyubi_user_token,
                                          'User_id':payload.User_id,
                                          'friends':resp.data.viewer.all_friends.edges,
                                          'end_cursor':resp.data.viewer.all_friends.page_info.end_cursor,
                                          'has_next_page': resp.data.viewer.all_friends.page_info.has_next_page

                                      });
                                  }else{
                                      resolve({
                                          'success':true,
                                          'count':0,
                                          'kyubi_user_token':payload.kyubi_user_token,
                                          'User_id':payload.User_id,
                                          'friends':resp.data.viewer.all_friends.edges,
                                          'end_cursor':"",
                                          'has_next_page': false

                                      });
                                      reject({'success':false,'count':1})
                                  }
                              }else{
                                  reject({'success':false,'count':2})
                              }
                          }else{
                              reject({'success':false,'count':3})
                          }
                      }else{
                          reject({'success':false,'count':4})
                      }
                  }else{
                      reject({'success':false,'count':5})
                  }
              }else{
                  reject({'success':false,'count':6})
              }
            }).catch(error=>{
                console.log("Friend Counts Error",error)
                reject({'success':false,'count':7})
            })
        }, 5000);
    })

}
 function serializeFBFriendReq(FBuserId,dtsg,cursor) {
  try{
    let rawData = {
      av: FBuserId,
      __user: FBuserId,
      __a: 1,
      dpr: 1,
      fb_dtsg: dtsg,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "ProfileCometTimelineFeedRefetchQuery",
      variables: JSON.stringify({
        count: 30,
        cursor: cursor,
        name: null,
        scale: 1,
      }),
      server_timestamps: true,
      doc_id: 4858065864249125,
    };
    let str = [];
    for (let p in rawData)
      if (rawData.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(rawData[p]));
      }
    return str.join("&");
  }catch(error){
      // console.log("This is a ",error);
  }
}
  
  module.exports = {
    
    fbDtsg,
    fbAccessToken,
    ScrapFacebookFriends
  };
  