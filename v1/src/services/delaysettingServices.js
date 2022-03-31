import axios from 'axios';
import { host,kyubi } from '../config';

const delaysettingService = {
    setSetting: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/delaysetting/setsetting',
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
    getSetting: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/delaysetting/getSetting',
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
    updateAutoresponderSetting: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/delaysetting/updateSetting',
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
    }
    
}

export default delaysettingService;