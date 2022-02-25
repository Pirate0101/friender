const UsersRepo = require('../../../models/repositories/user.repository');

module.exports.getOrStoreUser = async (req, res) => {
    try {
        let getUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
        console.log("This is my Respo",getUserInfo);
        if(getUserInfo){
            let  usersDetailsArray=[];
            if(req.body.plan !=  ""){
                usersDetailsArray['plan']=req.body.plan;
            }
            if(req.body.status !=  ""){
                usersDetailsArray['status']=req.body.status;
            }
            let UsersDetailinfo=Object.assign({}, usersDetailsArray);
            let UpdateUserInfo=await UsersRepo.UpdateUserInfo(getUserInfo._id,UsersDetailinfo);
            let UpdatedgetUserInfo = await UsersRepo.GetUserById(req.body.kyubi_user_token);
            res.send({
                code: 1,
                message: "Successfully User Updated",
                payload: UpdatedgetUserInfo
            });
        }else{
        let saveUesr=await UsersRepo.saveUserDetails(req.body);
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

