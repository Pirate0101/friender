import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { host, kyubiloginURL } from '../config'


const authService = {
    login: function (payload) {
        // console.log(payload);
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: kyubiloginURL,
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
    },getProfileInfo: function  () {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'GET',
                mode: " no-cors", // no-cors, cors, *same-origin
                url: "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed",
                headers: {  
                        "baseURL": "https://www.facebook.com",
                        "Access-Control-Allow-Origin": "*",
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
    checkLogin: function () {
        //return true
        let token = localStorage.getItem('Authorization')
        if (!token) return false
        let actualToken = token.split("JWT ")
        return jsonwebtoken.verify(actualToken[1], 'secret', function (err, decoded) {
            if (err) return false
            return true
        });
    },
    getuserInfoTosetWorld : function (payload) {
        // console.log(payload);
        
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/user/getUserInfoWithKyubiId',
                headers: {  'Accept': 'application/json','Access-Control-Allow-Origin': '*' ,'Content-Type': 'application/json' },
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
    }
}

export default authService