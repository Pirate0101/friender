import axios from 'axios';
import { host,kyubi } from '../config';

const authService = {
    login: function (payload) {
        // console.log(payload);
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: process.kyubi.loginURL,
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
    userRetrive: function    (payload)   {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/user/userRetrive',
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
    getProfileInfo: function  () {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'GET',
                mode: "cors", // no-cors, cors, *same-origin
                url: "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed",
                headers: {  
                        "baseURL": "https://www.facebook.com",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "text/html,application/json",
                        "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
                }
                // data: JSON.stringify(payload)
            }
            axios(options)
                .then(res => {
                    // console.log("In Success profile get",res);
                    resolve(res.data)
                })
                .catch(err => {
                    // console.log("Error In get profile data");
                    reject(err)
                })
        })
    },
    messageSend: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                mode: "cors", // no-cors, cors, *same-origin
                url: 'https://m.facebook.com/messages/send/?icm=1',
                headers: {  
                    "Origin": "https://m.facebook.com",
                    'Content-Type': 'text/html' },
                data: JSON.stringify(payload)
            }
            axios(options)
                .then(res => {
                    // console.log("In Success profile get",res);
                    resolve(res.data)
                })
                .catch(err => {
                    // console.log("Error In get profile data");
                    reject(err)
                })
            })
    },
    forgotPassword: function (payload) {
        return new Promise((resolve, reject) => {
            // console.log(payload);
            let options = {
                method: 'POST',
                mode: "cors", // no-cors, cors, *same-origin
                url: process.kyubi.forgotPassURL,
                headers: {  'Accept': 'application/json', 'Content-Type': 'application/json' },
                data: JSON.stringify(payload)
            }
            axios(options)
                .then(res => {
                    // console.log("In Success");
                    resolve(res)
                })
                .catch(err => {
                    // console.log("Error In Forgot Password");
                    reject(err)
                })
        })

    },
    GetOrStoreUser: function    (payload)   {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/user/getOrStoreUser',
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
    },GetOrStoreProfile: function    (payload)   {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/profile/getOrStoreProfile',
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
    },GetProfile: function    (payload)   {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/profile/getProfile',
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
    getProfileAccessToken:  function    (payload)   {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'GET',
                mode: "cors", // no-cors, cors, *same-origin
                url: "https://business.facebook.com/creatorstudio/home",
                headers: {  
                        "authority": "business.facebook.com",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "text/html,application/json"
                }
                // data: JSON.stringify(payload)
            }
            axios(options)
                .then(res => {
                        console.log("In Success profile get",res);
                        const responseText = res.data;
                        const match = responseText.match(/"userAccessToken":"(.*?)"/);
                        if (match && Array.isArray(match)) {
                            let accessToken = match[1];
                            resolve(accessToken)
                        }   
                    //resolve(res.data)
                })
                .catch(err => {
                    // console.log("Error In get profile data");
                    reject(err)
                })
        })
    }

    
}

export default authService