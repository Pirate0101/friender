
import axios from 'axios';
const authService = {
    
    getuserInfoTosetWorld : function (payload) {
         
        
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: 'http://localhost:8081/api/user/getUserInfoWithKyubiId',
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