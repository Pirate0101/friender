import axios from 'axios';
import { host,kyubi } from '../config';
import {serializeFBTotalReq,serializeFBFriendReq} from '../helper/helper';
const friendervice = {
    scrapFriends: function (payload) {
        return new Promise((resolve, reject) => {
             fetch("https://www.facebook.com/api/graphql/", {
    method: "POST",
    headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "text/html,application/json",
    "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
    },
    body: payload,
    }).then(async result=>{
        console.log("-------",result)
        let resp = await result.json();
        if (resp.hasOwnProperty("data")) {
            if (resp.data.hasOwnProperty("viewer")) {
                if (resp.data.viewer.hasOwnProperty("all_friends")) {
                  if (resp.data.viewer.all_friends.hasOwnProperty("edges")) {
                    let dataToSync = [];
                    console.log(
                      resp.data.viewer.all_friends.edges.length,
                      
                    );
                  }
                  console.log(resp.data.viewer.all_friends);
                }
            }
        }
    })
        })
    
        // return new Promise((resolve, reject) => {
        //     let options = {
        //         method: 'POST',
        //         url: "https://www.facebook.com/api/graphql/",
        //         headers: {  
        //             "baseURL": "https://www.facebook.com",
        //             "Content-Type": "application/x-www-form-urlencoded",
        //             "Accept": "text/html,application/json",
        //             "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
        //     },
        //     body: payload
        //     }
        //     axios(options)
        //         .then(res => {
        //             console.log("In Success");
        //             resolve(res)
        //         })
        //         .catch(err => {
        //             // console.log("In Error");
        //             reject(err)
        //         })
        // })
    },
    GetTotalFacebookFriends:  async  function    (payload)   {
    let serilizedData= await serializeFBTotalReq(payload.FBuserId,payload.dtsg,payload.cursor);
    return new Promise((resolve, reject) => {
    
    
        fetch("https://www.facebook.com/api/graphql/", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "text/html,application/json",
        "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
        },
        body: serilizedData,
        }).then(async result=>{
            let resp = await result.json();
            if (resp.hasOwnProperty("data")) {
                if (resp.data.hasOwnProperty("viewer")) {
                    console.log("==========2==================",resp.data.viewer);
                    if (resp.data.viewer.hasOwnProperty("all_friends_data")) {
                        console.log("============================",resp.data.viewer.all_friends_data.count);
                        resolve({'success':true,'count':resp.data.viewer.all_friends_data.count})
                    }else{
                        reject({'success':false,'count':0})
                    }
                }else{
                    reject({'success':false,'count':0})
                }
            }else{
                reject({'success':false,'count':0})
            }
        }).catch(error=>{
            console.log("Friend Counts Error",error)
            reject({'success':false,'count':0})
        })
    })
    //console.log(serilizedData);
    },
    StoreTotalFacebookFriends: function (payload){
        return new Promise((resolve, reject) => {
            console.log("This is the payload",payload);
            let options = {
                method: 'POST',
                url: host + '/api/friendcounter/saveOrUpdate',
                headers: {  'Accept': 'application/json', 'Content-Type': 'application/json' },
                data: payload
            }
            axios(options)
                .then(res => {
                    // console.log("In Success");
                    resolve(res)
                })
                .catch(err => {
                    // console.log("In Error");
                    reject(err)
                })
        })
    },
    ScrapFacebookFriends:  async  function    (payload)   {
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
                            if (resp.data.viewer.hasOwnProperty("all_friends_data")) {
                                console.log("===========5=================",resp.data.viewer.all_friends_data);
                                resolve({'success':true,'count':resp.data.viewer.all_friends_data})
                            }else{
                                reject({'success':false,'count':0})
                            }
                        }else{
                            reject({'success':false,'count':0})
                        }
                    }else{
                        reject({'success':false,'count':0})
                    }
                }).catch(error=>{
                    console.log("Friend Counts Error",error)
                    reject({'success':false,'count':0})
                })
            }, 5000);
        })

    },
    GetFacebookFriends: async   function    (payload)   {
        let serilizedData= await serializeFBFriendReq(payload.FBuserId,payload.dtsg,payload.cursor);
        return new Promise((resolve, reject) => {
    
            
                fetch("https://www.facebook.com/api/graphql/", {
                method: "POST",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "text/html,application/json",
                "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
                },
                body: serilizedData,
                }).then(async result=>{
                    let resp = await result.json();
                    if (resp.hasOwnProperty("data")) {
                        console.log("==========3==================",resp.data);
                        if (resp.data.hasOwnProperty("viewer")) {
                            console.log("==========4==================",resp.data.viewer);
                            if (resp.data.viewer.hasOwnProperty("all_friends_data")) {
                                console.log("===========5=================",resp.data.viewer.all_friends_data);
                                
                                if (resp.data.viewer.hasOwnProperty("all_friends")) {
                                    if (resp.data.viewer.all_friends.hasOwnProperty("edges")) {
                                        if (resp.data.viewer.all_friends.hasOwnProperty("page_info")) {
                                            resolve({
                                                'success':true,
                                                'count':resp.data.viewer.all_friends_data.count,
                                                'friends':resp.data.viewer.all_friends.edges,
                                                'end_cursor':resp.data.viewer.all_friends.page_info.end_cursor,
                                                'has_next_page': resp.data.viewer.all_friends.page_info.has_next_page

                                            });
                                        }else{
                                            resolve({
                                                'success':true,
                                                'count':resp.data.viewer.all_friends_data,
                                                'friends':resp.data.viewer.all_friends.edges,
                                                'end_cursor':"",
                                                'has_next_page': false

                                            });
                                            reject({'success':false,'count':0})
                                        }
                                    }else{
                                        reject({'success':false,'count':0})
                                    }
                                }else{
                                    reject({'success':false,'count':0})
                                }
                            }else{
                                reject({'success':false,'count':0})
                            }
                        }else{
                            reject({'success':false,'count':0})
                        }
                    }else{
                        reject({'success':false,'count':0})
                    }
                }).catch(error=>{
                    console.log("Friend Counts Error",error)
                    reject({'success':false,'count':0})
                })
            
        })
    }
}
export default friendervice