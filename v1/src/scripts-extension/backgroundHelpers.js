const { fbGrabRouteData } = require("./fbAPIs");

const fetchCollectionToken = async (dtsg, fbId, username) => {
  const path = (username === "" || Number.isInteger(parseInt(username))) ? `profile.php?id=${fbId}&sk=friends_all` : `/${username}/friends_all`;
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fbGrabRouteData(dtsg, path, fbId);
      const match = data.text.match(/"collectionToken":"(.*?)"/);
      if (match && Array.isArray(match)) {
        const accessToken = match[1];
        resolve(accessToken);
      }
    } catch (error) {
      reject(error);
    }
  });
}

const serializeFBFriendReq = (FBuserId, dtsg, cursor) => {
  try {
    let rawData = {
      av: FBuserId,
      __user: FBuserId,
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
      doc_id: 5393753507311167,
    };
    let str = [];
    for (let p in rawData)
      if (rawData.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(rawData[p]));
      }
    return str.join("&");
  } catch (error) {
    // console.log("This is a ",error);
  }
}

const ScrapFacebookFriends = async function (payload) {
  let serilizedDataNew = await serializeFBFriendReq(payload.FBuserId, payload.dtsg, payload.cursor);
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
      }).then(async result => {
        let resp = await result.json();
        if (resp.hasOwnProperty("data")) {
          console.log("==========3==================", resp.data);
          if (resp.data.hasOwnProperty("viewer")) {
            console.log("==========4==================", resp.data.viewer);
            if (resp.data.viewer.hasOwnProperty("all_friends")) {
              console.log("===========5=================", resp.data.viewer.all_friends);

              if (resp.data.viewer.hasOwnProperty("all_friends")) {
                if (resp.data.viewer.all_friends.hasOwnProperty("edges")) {
                  if (resp.data.viewer.all_friends.hasOwnProperty("page_info")) {
                    resolve({
                      'success': true,
                      'count': 0,
                      'kyubi_user_token': payload.kyubi_user_token,
                      'User_id': payload.User_id,
                      'friends': resp.data.viewer.all_friends.edges,
                      'end_cursor': resp.data.viewer.all_friends.page_info.end_cursor,
                      'has_next_page': resp.data.viewer.all_friends.page_info.has_next_page

                    });
                  } else {
                    resolve({
                      'success': true,
                      'count': 0,
                      'kyubi_user_token': payload.kyubi_user_token,
                      'User_id': payload.User_id,
                      'friends': resp.data.viewer.all_friends.edges,
                      'end_cursor': "",
                      'has_next_page': false

                    });
                    reject({ 'success': false, 'count': 1 })
                  }
                } else {
                  reject({ 'success': false, 'count': 2 })
                }
              } else {
                reject({ 'success': false, 'count': 3 })
              }
            } else {
              reject({ 'success': false, 'count': 4 })
            }
          } else {
            reject({ 'success': false, 'count': 5 })
          }
        } else {
          reject({ 'success': false, 'count': 6 })
        }
      }).catch(error => {
        console.log("Friend Counts Error", error)
        reject({ 'success': false, 'count': 7 })
      })
    }, 5000);
  })

}

const serializeFBSlowFriendReq = (FBuserId, dtsg, cursor, collectionToken) => {
  try {
    let rawData = {
      av: FBuserId,
      __user: FBuserId,
      __a: 1,
      dpr: 1,
      fb_dtsg: dtsg,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "ProfileCometAppCollectionListRendererPaginationQuery",
      variables: JSON.stringify({
        count: 20,
        cursor: cursor,
        search: null,
        scale: 1,
        id: collectionToken
      }),
      server_timestamps: true,
      doc_id: 3814944738571725,
    };
    let str = [];
    for (let p in rawData)
      if (rawData.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(rawData[p]));
      }
    return str.join("&");
  } catch (error) {
    // console.log("This is a ",error);
  }
}

const ScrapSlowFacebookFriends = async function (payload) {
  console.log("ScrapSlowFacebookFriends", payload)
  const serilizedDataNew = serializeFBSlowFriendReq(payload.FBuserId, payload.dtsg, payload.cursor, payload.collectionToken);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://www.facebook.com/api/graphql/", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "content-type": "application/x-www-form-urlencoded"
        },
        body: serilizedDataNew,
      }).then(async result => {
        let resp = await result.json();
        if (resp.hasOwnProperty("data")) {
          console.log("==========33==================", resp.data);
          if (resp.data.hasOwnProperty("node")) {
            console.log("==========44==================", resp.data.node);
            if (resp.data.node.hasOwnProperty("pageItems")) {
              console.log("===========55=================", resp.data.node.pageItems);
              if (resp.data.node.pageItems.hasOwnProperty("edges")) {
                console.log("===========66=================", resp.data.node.pageItems.edges);
                if (resp.data.node.pageItems.hasOwnProperty("page_info")) {
                  resolve({
                    'success': true,
                    'count': 0,
                    'kyubi_user_token': payload.kyubi_user_token,
                    'User_id': payload.User_id,
                    'friends': resp.data.node.pageItems.edges,
                    'end_cursor': resp.data.node.pageItems.page_info.end_cursor,
                    'has_next_page': resp.data.node.pageItems.page_info.has_next_page

                  });
                } else {
                  resolve({
                    'success': true,
                    'count': 0,
                    'kyubi_user_token': payload.kyubi_user_token,
                    'User_id': payload.User_id,
                    'friends': resp.data.node.pageItems.edges,
                    'end_cursor': "",
                    'has_next_page': false

                  });
                  reject({ 'success': false, 'count': 1 })
                }
              } else {
                reject({ 'success': false, 'count': 3 })
              }
            } else {
              reject({ 'success': false, 'count': 4 })
            }
          } else {
            reject({ 'success': false, 'count': 5 })
          }
        } else {
          reject({ 'success': false, 'count': 6 })
        }
      }).catch(error => {
        console.log("Friend Counts Error", error)
        reject({ 'success': false, 'count': 7 })
      })
    }, 5000);
  })
}

const ScrapNewSlowFacebookFriends = async function (payload) {
  let serilizedDataNew = await serializeFBFriendReq(payload.FBuserId, payload.dtsg, payload.cursor, payload.collectionToken);
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
      }).then(async result => {
        let resp = await result.json();
        if (resp.hasOwnProperty("data")) {
          console.log("==========3==================", resp.data);
          if (resp.data.hasOwnProperty("viewer")) {
            console.log("==========4==================", resp.data.viewer);
            if (resp.data.viewer.hasOwnProperty("all_friends")) {
              console.log("===========5=================", resp.data.viewer.all_friends);

              if (resp.data.viewer.hasOwnProperty("all_friends")) {
                if (resp.data.viewer.all_friends.hasOwnProperty("edges")) {
                  if (resp.data.viewer.all_friends.hasOwnProperty("page_info")) {
                    resolve({
                      'success': true,
                      'count': 0,
                      'kyubi_user_token': payload.kyubi_user_token,
                      'User_id': payload.User_id,
                      'friends': resp.data.viewer.all_friends.edges,
                      'end_cursor': resp.data.viewer.all_friends.page_info.end_cursor,
                      'has_next_page': resp.data.viewer.all_friends.page_info.has_next_page

                    });
                  } else {
                    resolve({
                      'success': true,
                      'count': 0,
                      'kyubi_user_token': payload.kyubi_user_token,
                      'User_id': payload.User_id,
                      'friends': resp.data.viewer.all_friends.edges,
                      'end_cursor': "",
                      'has_next_page': false

                    });
                    reject({ 'success': false, 'count': 1 })
                  }
                } else {
                  reject({ 'success': false, 'count': 2 })
                }
              } else {
                reject({ 'success': false, 'count': 3 })
              }
            } else {
              reject({ 'success': false, 'count': 4 })
            }
          } else {
            reject({ 'success': false, 'count': 5 })
          }
        } else {
          reject({ 'success': false, 'count': 6 })
        }
      }).catch(error => {
        console.log("Friend Counts Error", error)
        reject({ 'success': false, 'count': 7 })
      })
    }, 2000);
  })

}

const fetchFacebookFriendDetails = async function (payload) {
  let serilizedDataNew = await serializeFBFDetails(payload.FriendFacebookid, payload.ProfileURL, payload.UserFacebookId, payload.UserdtsgToken);
}

const getAboutFriend = (datax) => {
  console.log("This is x", datax);
  let newurl = "";
  if (datax.ProfileURL.indexOf("?id=") != -1) {
    newurl = datax.ProfileURL + "&sk=about_overview"
  } else {
    newurl = datax.ProfileURL + "/about_overview"
  }
  
}

module.exports = {
  ScrapFacebookFriends,
  fetchCollectionToken,
  ScrapSlowFacebookFriends,
  ScrapNewSlowFacebookFriends,
  fetchFacebookFriendDetails,
  getAboutFriend
};
