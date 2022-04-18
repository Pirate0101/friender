
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
            "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
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
const ScrapNewSlowFacebookFriends=  async  function    (payload)   {
  let serilizedDataNew= await serializeFBFriendReq(payload.FBuserId,payload.dtsg,payload.cursor,payload.collectionToken);
  console.log(serilizedDataNew);
  return new Promise((resolve, reject) => {

      setTimeout(() => {
          fetch("https://www.facebook.com/api/graphql/", {
          method: "POST",
          headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/html,application/json",
          "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
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
      }, 2000);
  })

}
const ScrapSlowFacebookFriends=  async  function    (payload)   {
  console.log("Thei is the Paylod in fffffffffffffffffffffffffffffffffffff",payload)
  let variables= {
    count: 8,
    scale: 1,
    search: null,
    id: payload.collectionToken,
  };
  if (payload.cursor) {
    variables.cursor = payload.cursor;
  }
  let formData = new FormData();
  formData.append("__user", payload.FBuserId);
  formData.append("fb_dtsg", payload.dtsg);
  formData.append("fb_api_caller_class", "RelayModern");
  formData.append("doc_id", 4858065864249125);
  formData.append("variables", JSON.stringify(variables));
  //https://www.facebook.com/api/graphql/
  
  return new Promise((resolve, reject) => {

    setTimeout(() => {
        fetch("https://www.facebook.com/api/graphql/", {
        method: "POST",
        headers: {
        Accept: "text/html,application/json"
        },
        body: formData,
        }).then(async result=>{
            let resp = await result.json();
          if (resp.hasOwnProperty("data")) {
              console.log("==========33==================",resp.data);
              if (resp.data.hasOwnProperty("viewer")) {
                  console.log("==========44==================",resp.data.viewer);
                  if (resp.data.viewer.hasOwnProperty("all_friends")) {
                      console.log("===========55=================",resp.data.viewer.all_friends);
                      
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
      fb_api_req_friendly_name: "FriendingCometFriendsListPaginationQuery",
      variables: JSON.stringify({
        count: 8,
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
function serializeFBSlowFriendReq(FBuserId,dtsg,cursor,collectionToken) {
  try{
    let rawData = {
      av: FBuserId,
      __user: FBuserId,
      __a: 1,
      dpr: 1,
      fb_dtsg: dtsg,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "FriendingCometFriendsListPaginationQuery",
      variables: JSON.stringify({
        count: 8,
        cursor: cursor,
        search: null,
        scale: 1,
        id:collectionToken
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
const fetchCollectionToken = async (dtsg, fbId, username)=>{
  const path = username === "" ? `profile.php?id=${fbId}&sk=friends_all` : `/${username}/friends_all`;
  let formData = new FormData();
  formData.append("__user", `${fbId}`);
  formData.append("fb_dtsg", dtsg);
  formData.append("route_urls[0]", "/");
  formData.append("route_urls[0]", path);
  formData.append("__a", "1");
  formData.append("dpr", "1");
  formData.append("__req", "4");
  formData.append("routing_namespace", "fb_comet");
  formData.append("__comet_req", "1");

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://www.facebook.com/ajax/bulk-route-definitions/",{
      method: "POST", 
      headers: {
        Accept: "text/html,application/json"
        },     
      body: formData}).then(async (e) => e.text())
      .then(async (e) => {
        const match = e.match(/"collectionToken":"(.*?)"/);
        if (match && Array.isArray(match)) {
            let accessToken = match[1];
            resolve(accessToken);
        } 
      })
      
      
      
    } catch (error) {
      reject(error);
    }
  });
}
const fetchFacebookFriendDetails =async function (payload){
  let serilizedDataNew= await serializeFBFDetails(payload.FriendFacebookid,payload.ProfileURL,payload.UserFacebookId,payload.UserdtsgToken);
}
function serializeFBFDetails(FriendFacebookid,ProfileURL,UserFacebookId,UserdtsgToken){
  let formData = new FormData();
  formData.append("fb_dtsg", UserdtsgToken);
  formData.append("route_url", FriendFacebookid);
  formData.append("client_previous_actor_id", UserFacebookId);
  formData.append("__user", UserFacebookId);
  formData.append("routing_namespace", "fb_comet");
  formData.append("__comet_req", 1);
  formData.append("__a", 1);
  formData.append("dpr", 1);
  fetch("https://www.facebook.com/ajax/route-definition/", {
    body: formData,
    headers: {
      accept: "application/json, text/plain, */*",
    },
    method: "POST",
  })
    .then((e) => e.text()).then((e)=>{
      console.log(e);
    })
}
function isEmpty(strIn)
{
    if (strIn === undefined)
    {
        return true;
    }
    else if(strIn == null)
    {
        return true;
    }
    else if(strIn == "")
    {
        return true;
    }
    else
    {
        return false;
    }
}
const getAboutFriend=(datax)=>{
  console.log("This is x",datax);
  let newurl="";
  if(datax.ProfileURL.indexOf("?id=") != -1){
    newurl =datax.ProfileURL+"&sk=about_overview"
  }else{
    newurl =datax.ProfileURL+"/about_overview"
  }
  fetch(newurl, {
    method: "GET",
    mode: "cors", // no-cors, cors, *same-origin
    headers: {  
      "authority": "www.facebook.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "text/html,application/json"
  }
  })
    .then((e) => e.text()).then((e) => { 
      
      let axe= e.split('<script>').pop().split(',"css"]]]});});});</script>'); 
      //console.log("This Is what I gooooot",axe)
for (var i = 0; i < axe.length; i++) {
  if (axe[i].src) {
  	console.log(i, axe[i].src);
  } else { 
    console.log(i, axe[i].innerHTML);
  }
}
  })

}
  module.exports = {
    
    fbDtsg,
    fbAccessToken,
    ScrapFacebookFriends,
    fetchCollectionToken,
    ScrapSlowFacebookFriends,
    ScrapNewSlowFacebookFriends,
    fetchFacebookFriendDetails,
    getAboutFriend
  };
  