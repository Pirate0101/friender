/* eslint-disable no-undef */
/** 
 * @OpenFacebookInTab
 * this function will open Facebook in a new  tab and will  focus  on it
 * 
*/
import AuthServices from "../services/authService";

export function OpenFacebookInTab() {
    try{
        const myNewUrl  =   `https://www.facebook.com/me`;
            let CreateTab    =   chrome.tabs.create({
                url: myNewUrl,
                active: true
              });
              // console.log("This is a ",CreateTab);
              return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }

/** 
 * @CheckUserInfoFromFaccebook
 * this function will open Facebook in a new Window and grab its info
 * 
*/
export async function CheckUserInfoFromFaccebook() {
    try{  
        const gfs = chrome.storage.local;
        let fbprofile = await GetData('fbprofile'), 
            fbmunread = await GetData('fbmunread');
        
        // if(fbprofile){
        //     let newtab=parseInt(fbprofile);
        //     chrome.tabs.remove(newtab, function() {
        //         gfs.remove(['fbprofile']);
        //     });
        // }
        if(fbmunread){
            let newtabx=parseInt(fbmunread);
            chrome.tabs.remove(newtabx, function() { 
                gfs.remove(['fbmunread']);
            });
        }
        gfs.remove(['fbthread']);
        const myNewUrl  =   `https://www.facebook.com`;
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: false,
            pinned:true
        },function(tab) { 
            let fbprofile=tab.id;
            gfs.set({'fbprofile': fbprofile});
            //  chrome.tabs.executeScript(tab.id, {file: "profileOverlay.js"}, function() { 
            //                         // console.log("Its been called");
            //                       });
            //chrome.runtime.sendMessage({type: "OpenMessageProfileToRead", options: fbprofile});

        });

            return CreateTab;
            
    }catch(error){
        // console.log("This is a ",error);
    }
  }

  /** 
 * @getData
 * this function will grab data from local store
 * 
*/

export function GetData(key) {
  return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get([key], function (res) {
          if (!isEmptyObj(res)) {
            // console.log("key in helper : ", key);
            // console.log("retieved data in helper : ",res[key]);
            if(res[key]!=null || res[key]!=undefined)
              resolve(res[key]);
            else {
                resolve(0);
            }
          } else {
            resolve(0);
          }
        });
      } catch (e) {
        resolve(0);
      }
  });
      
}

/** 
 * @isEmptyObj
 * this function will check wheather the @obj is object or not
 * 
*/
const isEmptyObj = function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

/** 
 * @OpenFacebookProfileInTab
 * this function will open Facebook Profile in a new Tab
 * 
*/
export async function OpenFacebookProfileInTab() {
    try{
        let fb_name = await GetData('fb_name');
        
        const myNewUrl  =   'https://www.facebook.com/'+fb_name;
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
}

export  const getDTSG = function () {    
  AuthServices.getProfileInfo().then((result) => {
    try {
      let  dtsg
      const regex4 = /\\"dtsg\\":\{[^}]*\}/gm; 
      if (result.match(regex4)!= null) {
        // console.log("it is true");

        dtsg = result.match(regex4)[0];

        dtsg = "{" + dtsg.replace(/[\\]/g, "") + "}";
        // console.log("dtsg in login helper 2", dtsg);

        dtsg = JSON.parse(dtsg).dtsg;
        console.log("dtsg in login helper 3", dtsg);
      }
      console.log("dtsg : ", dtsg);
      chrome.storage.set({"dtsg" : dtsg});
      // return(dtsg);
    }
    catch (err) {
      // console.log("err : ", err);
    }
  }).catch(error => {
      // console.log("This I got From backGround EROOOOOO dash1", error);
  })
}

/** 
 * @OpenPoweredBy
 * this function will open Powered By in a new Tab
 * 
*/
export function OpenPoweredBy() {
    try{
        const myNewUrl  =   'https://www.tier5.us';
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }
/** 
 * @OpenTier5Partnership
 * this function will open Tier5 Partnership in a new Tab
 * 
*/
export function OpenTier5Partnership() {
    try{
        const myNewUrl  =   'https://partner.tier5.us';
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }
/** 
 * @OpenFacebookLink
 * this function will open Facebook Link in a new Tab
 * 
*/
export function OpenFacebookLink() {
    try{
        const myNewUrl  =   'https://www.facebook.com/tier5development';
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }
/** 
 * @OpenMessengerLink
 * this function will open Powered By in a new Tab
 * 
*/
export function OpenMessengerLink() {
    try{
        const myNewUrl  =   'https://www.messenger.com/tier5development';
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }
/** 
 * @OpenSignupLink
 * this function will open Signup Link in a new Tab
 * 
*/
export function OpenSignupLink() {
    try{
        const myNewUrl  =   'https://www.mefnevan.com';
        let CreateTab    =   chrome.tabs.create({
            url: myNewUrl,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }

export function framecaller()   {
    try{
        const myNewUrl  =   'https://www.facebook.com/'
        // console.log("This is a ",myNewUrl);
        return myNewUrl;
    }catch(error){
        // console.log("This is a ",error);
    }
}

/** 
 * @OpenLink
 * this function will open Link in a new Tab
 * 
*/
export function OpenLink(URL) {
    try{
        let CreateTab    =   chrome.tabs.create({
            url: URL,
            active: true
          });
          // console.log("This is a ",CreateTab);
          return CreateTab;
    }catch(error){
        // console.log("This is a ",error);
    }
  }