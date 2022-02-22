import axios from 'axios';
import { host,kyubi } from '../config';

const groupServices = {
    createGroup: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host+ '/api/group/create',
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
    getGroup: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/group/list',
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
    editGroup: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/group/edit',
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
    UpdateGroup: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/group/update',
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
    DeleteGroup: function (payload) {
        return new Promise((resolve, reject) => {
            let options = {
                method: 'POST',
                url: host + '/api/group/delete',
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
export default groupServices;