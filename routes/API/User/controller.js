const UsersRepo = require('../../../models/repositories/user.repository');
const ProfilesRepo = require('../../../models/repositories/profile.repository');
const config = require('../../../config/development.json');
const ENDPOINT = config.socket_local_url;
const io = require("socket.io-client");
let socketc = io(ENDPOINT, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});


module.exports.getOrStoreUser = async (req, res) => {
    try {
        let getUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
        console.log("This is my Respo", getUserInfo);
        if (getUserInfo.length) {
            let usersDetailsArray = [];
            if (req.body.plan != "") {
                usersDetailsArray['plan'] = req.body.plan;
            }
            if (req.body.status != "") {
                usersDetailsArray['status'] = req.body.status;
            }
            let UsersDetailinfo = Object.assign({}, usersDetailsArray);
            let UpdateUserInfo = await UsersRepo.UpdateUserInfo(getUserInfo.kyubi_user_token, UsersDetailinfo);
            let UpdatedgetUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
            res.send({
                code: 1,
                message: "Successfully User Updated",
                payload: UpdatedgetUserInfo
            });
        } else {
            let saveUesr = await UsersRepo.saveUserDetails(req.body);
            res.send({
                code: 1,
                message: "Successfully User Added",
                payload: saveUesr
            });
        }




    } catch (error) {
        res.send({
            code: 3,
            message: error.message,
            payload: error
        })
    }
}
module.exports.getUserInfoWithKyubiId = async (req, res) => {
    try {
        console.log("++++++++++++++++++++++++++++++++++++++", req.body.worlid);

        let UserInfo = await UsersRepo.GetUserById(req.body.worlid);
        if (UserInfo) {
            res.send({
                code: 1,
                message: "Successfully User Added",
                payload: { UserInfo }
            });
        } else {
            res.send({
                code: 2,
                message: "Sorry No User Present with this user Id",
                payload: {}
            });
        }

    } catch (error) {
        res.send({
            code: 3,
            message: error.message,
            payload: error
        })
    }
}
module.exports.CheckThenStoreProfileInfo = async (req, res) => {
    try {
        let userInfo = req.body;
        let Room = req.body.kyubi_user_token;

        socketc.emit('requestUserFacebookEmit', { userInfo, Room });
        res.send({
            code: 1,
            message: "Successfully User Added",
            payload: req.body
        });

    } catch (error) {
        res.send({
            code: 3,
            message: error.message,
            payload: error
        })
    }
}
module.exports.storeProfileInfoUser = async (req, res) => {
    try {

        let getProfileInfo = await ProfilesRepo.GetProfileByParam(req.body.user_id, req.body.UserFacebookid);
        if (getProfileInfo) {
            let ProfileStatus = { status: false };
            let ProfileDetails = {
                UserFacebookImage: req.body.UserFacebookImage,
                UserFacebookName: req.body.UserFacebookName,
                UserFacebookUsername: req.body.UserFacebookUsername,
                UserFacebookid: req.body.UserFacebookid,
                UserdtsgExpire: req.body.UserdtsgExpire,
                UserdtsgToken: req.body.UserdtsgToken,
                access_token: req.body.access_token,
                UsercollectionToken: req.body.UsercollectionToken,
                status: true
            }
            let UpdateProfileStatus = await ProfilesRepo.UpdateProfile(req.body.user_id, ProfileStatus);
            let UpdateProfile = await ProfilesRepo.UpdateProfileManyInfo(req.body.user_id, req.body.UserFacebookid, ProfileDetails);
            // console.log("This are the Profile Details",ProfileDetails);
            // let saveProfile=await ProfilesRepo.saveProfileDetails(req.body);
            // let getUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
            // let newProfileCount =getUserInfo[0].profile_count+1;
            // console.log("New ProfileCount",newProfileCount);
            // let UserUpdateParam={profile_count : newProfileCount}
            // let UpdateUser = await UsersRepo.UpdateUserInfo(req.body.user_id,{profile_count : newProfileCount});
            let getUserInfoNew = await UsersRepo.GetUserById(req.body.kyubi_user_token);
            res.send({
                code: 1,
                message: "Successfully Added",
                payload: getUserInfoNew
            })
        } else {
            let ProfileStatus = { status: false };
            let UpdateProfile = await ProfilesRepo.UpdateProfile(req.body.user_id, ProfileStatus);
            console.log("This are the Profile Details", UpdateProfile);
            let ProfileDetails = { ...req.body, status: true }
            // console.log("This are the Profile Details",ProfileDetails);
            // let ProfileStatus={status:false};
            // let UpdateProfile=await ProfilesRepo.UpdateProfile(req.body.user_id,ProfileStatus);
            let saveProfile = await ProfilesRepo.saveProfileDetails(req.body);
            let getUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
            let newProfileCount = getUserInfo[0].profile_count + 1;
            // console.log("New ProfileCount",newProfileCount);
            let UserUpdateParam = { profile_count: newProfileCount }
            let UpdateUser = await UsersRepo.UpdateUserInfo(req.body.user_id, { profile_count: newProfileCount });
            let getUserInfoNew = await UsersRepo.GetUserById(req.body.kyubi_user_token);
            res.send({
                code: 1,
                message: "Successfully Added",
                payload: getUserInfoNew
            })
        }
    } catch (error) {
        res.send({
            code: 3,
            message: error.message,
            payload: error
        })
    }
}

