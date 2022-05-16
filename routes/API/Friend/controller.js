
const FriendRepo = require('../../../models/repositories/friends.repository');
const config = require('../../../config/development.json');
const ENDPOINT = config.socket_local_url;
const io = require("socket.io-client");
let socketc = io(ENDPOINT, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
module.exports.storeUserFriends = async (req, res) => {
    try{
        await req.body.friends.map(async (friends, key) => {
            let existingFriends=await FriendRepo.CheckFriendsDetails(friends.friend.node.id,req.body.User_id,req.body.profileId);
            console.log("FrienCountEXisting Table",existingFriends)
            if(existingFriends ===null || existingFriends ===0){

            
                let FriendsList={
                    user_id: req.body.User_id,
                    kyubi_user_token: req.body.kyubi_user_token,
                    UserFacebookName: friends.friend.title.text,
                    UserFacebookid: friends.friend.node.id,
                    FriendshipStatus: friends.friend.actions_renderer.action.profile_owner.friendship_status,
                    Gender: friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.gender ? friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.gender : "",
                    ShortName: friends.friend.title.text,
                    ProfileURL: friends.friend.url,
                    UserFacebookImage: friends.friend.image.uri,
                    SubscribeStatus: friends.friend.actions_renderer.action.is_active,
                    profileId: req.body.profileId
                    };
                const saveFriend=await FriendRepo.saveFBFriendDetails(FriendsList);
                
            }else{
            }
        });
        // let FriendsCount = await FriendCountRepo.GetFriendCountByParam(req.body.User_id, req.body.FBuserId);
        // let existingFriendsCount=await FriendRepo.CheckFriendsCounts(req.body.User_id,req.body.profileId);
        let socketArray = {
            ScrapingStatus: req.body.has_next_page,
            ScrapingUser: req.body.User_id,
            ScrapingFacebookId: req.body.FBuserId,
            ScrapingKyubiId: req.body.kyubi_user_token,
        }
            let Room = req.body.kyubi_user_token;
            socketc.emit('requestUserFacebookFriendsEmit', { socketArray, Room });
            res.send({
                code: 1,
                message: "Successfully Added User Friends",
                payload: socketArray
            });
        
        
    } catch (e) {
        res.send({
            code: 1,
            message: e,
            payload: req.body
        });
    }
}
module.exports.GetUserFriendsbase = async (req, res) => {
    try {
        console.log("This Are the Friends Info", req.body);
        let FriendDetails = await FriendRepo.findFriendsBase(req.body.Id, req.body.UserFacebookid);
        res.send({
            code: 1,
            message: "This are the Friend Details",
            payload: FriendDetails
        });
    } catch (e) {
        res.send({
            code: 1,
            message: error,
            payload: req.body
        });
    }
}
