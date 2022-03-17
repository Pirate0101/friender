const ProfilesRepo = require('../../../models/repositories/profile.repository');
const UsersRepo = require('../../../models/repositories/user.repository');

module.exports.getOrStoreProfile = async (req, res) => {
    try {
        
        let getProfileInfo = await ProfilesRepo.GetProfileByParam(req.body.user_id,req.body.UserFacebookid);
        let getUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
        req.body.kyubi_user_token
        if(getProfileInfo){
            let  profileDetailsArray=[];
            let  profileUpdateArray=[];
            if(req.body.UserFacebookName !=  ""){
                profileDetailsArray['UserFacebookName']=req.body.UserFacebookName;
            }
            if(req.body.UserdtsgToken !=  ""){
                profileDetailsArray['UserdtsgToken']=req.body.UserdtsgToken;
            }
            if(req.body.UserFacebookImage !=  ""){
                profileDetailsArray['UserFacebookImage']=req.body.UserFacebookImage;
            }
            if(req.body.UserFacebookUsername !=  ""){
                profileDetailsArray['UserFacebookUsername']=req.body.UserFacebookUsername;
            }
            if(req.body.UserdtsgExpire !=  ""){
                profileDetailsArray['UserdtsgExpire']=req.body.UserdtsgExpire;
            }
            if(req.body.access_token !=  ""){
                profileDetailsArray['access_token']=req.body.access_token;
            }
            profileDetailsArray['status']=true;
            profileUpdateArray['status']=false;
            let UsersProfileUpdateinfo=Object.assign({}, profileUpdateArray);
            //console.log(getProfileInfo);
            let UpdateProfileMany = await ProfilesRepo.UpdateProfileManyInfo(req.body.user_id,UsersProfileUpdateinfo);
            let UsersProfileinfo=Object.assign({}, profileDetailsArray);
            let UpdateProfileInfo=await ProfilesRepo.UpdateProfileInfo(getProfileInfo._id,UsersProfileinfo);
            
            if(UpdateProfileInfo){
                let UpdatedProfileInfo = await ProfilesRepo.GetProfileById(getProfileInfo._id);
                res.send({
                    code: 1,
                    message: "Successfully Added User Profile222",
                    payload: UpdatedProfileInfo
                });
            }
            
        }else{
            let  profileUpdateArray=[];
            let  userUpdateArray=[];
            profileUpdateArray['status']=false;
            userUpdateArray['profile_count']=getUserInfo.profile_count+1;
            let UsersProfileUpdateinfo=Object.assign({}, profileUpdateArray);
            let UsersUpdateinfoobj=Object.assign({}, userUpdateArray);
            //console.log(getProfileInfo);
            let UpdateProfileMany = await ProfilesRepo.UpdateProfileManyInfo(req.body.user_id,UsersProfileUpdateinfo);
            let UpdateUser = await UsersRepo.UpdateUserInfo(req.body.user_id,UsersUpdateinfoobj);
            console.log("This is my Respo",UpdateUser);
            let saveProfile=await ProfilesRepo.saveProfileDetails(req.body);
            res.send({
                code: 1,
                message: "Successfully Added User Profile3333333",
                payload: saveProfile
            });
        }
        //console.log("This is my Respo",getProfileInfo);
        
        
        } catch (error) {
            res.send({
                code: 3,
                message: error.message,
                payload: error
            })
        }
}
module.exports.getProfile   =   async   (req,   res)    =>  {
    try {
        let getProfileInfo = await ProfilesRepo.GetActiveProfile(req.body.user_id);
        if(getProfileInfo){
            res.send({
                code: 1,
                message: "Successfully Added User Profile3333333",
                payload: getProfileInfo
            });
        }else{
            res.send({
                code: 2,
                message: "Successfully Added User Profile3333333",
                payload: {}
            });
        }
        
    }   catch(error)    {

    }
}