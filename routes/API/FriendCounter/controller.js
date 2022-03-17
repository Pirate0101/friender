const FriendCountRepo = require('../../../models/repositories/friendcount.repository');
module.exports.saveOrUpdate = async (req, res) => {
    let getProfileInfo = await FriendCountRepo.GetFriendCountByParam(req.body.user_id,req.body.UserFacebookid);
    if(getProfileInfo){
        res.send({
            code: 1,
            message: "Successfully Added User Profile222",
            payload: getProfileInfo
        });
    }else{
        let getProfileInfo = await FriendCountRepo.saveFriendCountDetails(req.body);
        res.send({
            code: 1,
            message: "Successfully Added User Profile222",
            payload: getProfileInfo
        });
    }
    
}