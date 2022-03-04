/* eslint-disable no-undef */
import AuthServices from "../services/authService";

const loginHelper = {
    
    login: function () {
        
        AuthServices.getProfileInfo().then((result) => {
            try {
                let sugest, dtsg, UserFacebookUsername = "", UserFacebookName = "", UserFacebookid = "", UserFacebookImage = "", UserLoggedInFacebook = false;
                const regex3 = /\\"suggestions\\":\[\{[^}]*\}/gm;
                const regex4 = /\\"dtsg\\":\{[^}]*\}/gm;
                if (result.match(regex4)!= null) {
                    // console.log("it is true");

                    dtsg = result.match(regex4)[0];

                    dtsg = "{" + dtsg.replace(/[\\]/g, "") + "}";
                    // console.log("dtsg in login helper 2", dtsg);

                    dtsg = JSON.parse(dtsg).dtsg;
                    // console.log("dtsg in login helper 3", dtsg);
                }
                console.log("dtsg : ", dtsg);
                chrome.storage.local.set({"dtsg" : dtsg});

                if (regex3.test(result)) {
                    sugest = result.match(regex3)[0];
                    sugest = "{" + sugest.replace(/[\\]/g, "") + "]}"
                    sugest = JSON.parse(sugest).suggestions[0]
                    // console.log("sugest in login helper", sugest);
                    setTimeout(()=>{
                        UserFacebookid = sugest.uid;
                        UserFacebookUsername = sugest.path.replace('/', '');
                        UserFacebookName = sugest.text;
                        UserFacebookImage = sugest.photo;
                        UserLoggedInFacebook = true;
                        let parameters={
                            FacebookId : UserFacebookid,
                            FacebookUsername : UserFacebookUsername,
                            FacebookName : UserFacebookName,
                            FacebookImage  : UserFacebookImage,
                            LoggedInFacebook  : UserLoggedInFacebook
                        }
                        // console.log("parameters : ", parameters);
                        chrome.runtime.sendMessage({type: "storeUserInfoOrQueryThenStore", options: parameters});
                    },500)
                }else {
                    UserLoggedInFacebook = false;
                    let parameters={
                        FacebookId : UserFacebookid,
                        FacebookUsername : UserFacebookUsername,
                        FacebookName : UserFacebookName,
                        FacebookImage  : UserFacebookImage,
                        LoggedInFacebook  : UserLoggedInFacebook
                    }
                    // console.log("parameters : ", parameters);
                    chrome.runtime.sendMessage({type: "storeUserInfoOrQueryThenStore", options: parameters});
                }
            }
            catch (err) {
              console.log("err : ", err);
            }
            }).catch(error => {
                console.log("This I got From backGround EROOOOOO dash1", error);
            })
    },
    logout: function () {
    try{
        const gfs = chrome.storage.local;
        gfs.get(['fbprofile'], function(res){
            if(res.fbprofile !== undefined && res.fbprofile !== null) {
                let newtab=parseInt(res.fbprofile);
                chrome.tabs.remove(newtab, function() { 
                    gfs.remove(['fbprofile']);
                });
            }
        })
        gfs.get(['fbmunread'], function(res){
            if(res.fbmunread !== undefined && res.fbmunread !== null) {
                let newtabx=parseInt(res.fbmunread);
                chrome.tabs.remove(newtabx, function() { 
                    gfs.remove(['fbmunread']);
                });
            }
        })
        gfs.remove(['fbthread']);
        const myNewUrl  =   `https://www.facebook.com/profile.php`;
        let CreateWindow    = chrome.runtime.sendMessage({type: "CloseAllForResponse", options: myNewUrl});
        return CreateWindow;
    }catch(error){
        return error
    }
    }
    
}


export default loginHelper