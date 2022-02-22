import axios from 'axios';
import { host,kyubi } from '../config';

const segmentServices = {
    createSegment: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/segment/create',
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
    getSegment: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/segment/list',
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
    editSegment: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/segment/edit',
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
    UpdateSegment: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/segment/update',
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
    DeleteSegment: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/segment/delete',
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
    
}
export default segmentServices;