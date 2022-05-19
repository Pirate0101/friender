const FriendCountRepo = require('../../../models/repositories/friendcount.repository');
const FriendRepo = require('../../../models/repositories/friends.repository');
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
    
},
module.exports.GetAndSetUserFriendsCounts = async (req, res) => {
    try{
        console.log(req.body);
    let FriendsCount = await FriendCountRepo.GetFriendCountByParam(req.body.User_id, req.body.FBuserId);
    let existingFriendsCount=await FriendRepo.CheckFriendsCounts(req.body.User_id,req.body.profileId);
    console.log("This Are the Friend Count Table",FriendsCount)
    console.log("This Are the Friends Table Info",existingFriendsCount)
    if(FriendsCount === null){
        let friendcountArray = {
            user_id: req.body.User_id,
            kyubi_user_token: req.body.kyubi_user_token,
            UserFacebookid: req.body.FBuserId,
            totalCount: existingFriendsCount,
            totalActive: 0,
            totalScrap: existingFriendsCount,
            ScrapingStatus: req.body.hasNextPage
        }
        
        let UpdateFriends = await FriendCountRepo.saveFriendCountDetails(friendcountArray);
        if(UpdateFriends){
            res.send({
                code: 1,
                message: "Success",
                payload: friendcountArray
            });
        }else{
            res.send({
                code: 1,
                message: "Sorry The Is a Save Error",
                payload: friendcountArray
            });
        }
    }else{
        let friendcountArray = {

            totalCount: existingFriendsCount,
            totalActive: 0,
            totalScrap: existingFriendsCount,
            ScrapingStatus: req.body.hasNextPage
        }
        
        let UpdateFriends = await FriendCountRepo.UpdateFriendCountManyInfo(req.body.User_id, req.body.FBuserId, friendcountArray);
        if(UpdateFriends){
            res.send({
                code: 1,
                message: "Success",
                payload: friendcountArray
            });
        }else{
            res.send({
                code: 1,
                message: "Sorry The Is a Save Error",
                payload: friendcountArray
            });
        }
    }
    
    } catch (e) {
        res.send({
            code: 1,
            message: e,
            payload: req.body
        });
    }
}