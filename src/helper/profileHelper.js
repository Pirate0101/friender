/* eslint-disable no-undef */

import AuthServices from "../services/authService";

export function profileGetter(data) {
    return new Promise((resolve, reject) => {
        try {
            let sugest, dtsg, UserFacebookUsername = "", UserFacebookName = "", UserFacebookid = "", UserFacebookImage = "", UserLoggedInFacebook = false;
            const regex3 = /\\"suggestions\\":\[\{[^}]*\}/gm;
            const regex4 = /\\"dtsg\\":\{[^}]*\}/gm;
            if (data.match(regex4)!= null) {
                dtsg = data.match(regex4)[0];
                dtsg = "{" + dtsg.replace(/[\\]/g, "") + "}";
                dtsg = JSON.parse(dtsg).dtsg;
                
            }
            if (regex3.test(data)) {
                sugest = data.match(regex3)[0];
                sugest = "{" + sugest.replace(/[\\]/g, "") + "]}"
                sugest = JSON.parse(sugest).suggestions[0]
                resolve(  {
                    FacebookStatus:true,
                    UserFacebookid : sugest.uid,
                    UserFacebookUsername : sugest.path.replace('/', ''),
                    UserFacebookName : sugest.text,
                    UserFacebookImage : sugest.photo,
                    UserdtsgToken :dtsg.token,
                    UserdtsgExpire :dtsg.expire,
                    Error:false
                    })
                
            }else {
                resolve( {
                    FacebookStatus:false,
                    UserFacebookid : false,
                    UserFacebookUsername : false,
                    UserFacebookName : false,
                    UserFacebookImage : false,
                    UserdtsgToken :dtsg.token,
                    UserdtsgExpire :dtsg.expire,
                    Error:"Blocked"
                })
            }
        } catch (e) {
            reject({
                FacebookStatus:false,
                UserFacebookid : false,
                UserFacebookUsername : false,
                UserFacebookName : false,
                UserFacebookImage : false,
                UserdtsgToken :false,
                UserdtsgExpire :false,
                Error:e
            });
          }
      });
          
    }
