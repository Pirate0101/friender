import axios from 'axios'



const FriendService = {
    GetUserFriendsbase : function (payload) {
        // console.log(payload);
        
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: 'http://localhost:8081/api/friend/GetUserFriendsbase',
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
    },
    GetAndSetUserFriendsCounts : function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: 'http://localhost:8081/api/friendcounter/GetAndSetUserFriendsCounts',
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
export default FriendService