
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
            let existingFriends=await FriendRepo.CheckFriendsDetails(friends.friend.id,req.body.User_id,req.body.profileId);
            console.log("FrienCountEXisting Table",existingFriends)
            if(existingFriends ===null || existingFriends ===0){
                console.log("ADDDDDDDDDDDDDDDDDDDDDDD",friends.friend)
            
                let FriendsList={
                    user_id: req.body.User_id,
                    kyubi_user_token: req.body.kyubi_user_token,
                    UserFacebookName: friends.friend.name,
                    UserFacebookid: friends.friend.id,
                    FriendshipStatus: friends.friend.friendship_status,
                    Gender: friends.friend.gender ? friends.friend.gender : "",
                    ShortName: friends.friend.short_name,
                    ProfileURL: friends.friend.url,
                    UserFacebookImage: friends.friend.profile_picture ? friends.friend.profile_picture.uri : friends.friend.image.url,
                    SubscribeStatus: friends.friend.subscribe_status,
                    profileId: req.body.profileId,
                    desider:1
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
            FriendType:'active'
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
module.exports.storeUserSlowFriends = async (req,res)   =>  {
    try{
        await req.body.friends.map(async (friends, key) => {
            console.log("Friendddddd",friends)
            let existingFriends=await FriendRepo.CheckFriendsDetails(friends.friend.node.id,req.body.User_id,req.body.profileId);
            console.log("FrienCountEXisting Table",existingFriends)
            if(existingFriends ===null || existingFriends ===0){
                console.log("ADDDDDDDDDDDDDDDDDDDDDDD",friends.friend)
            
                let FriendsList={
                    user_id: req.body.User_id,
                    kyubi_user_token: req.body.kyubi_user_token,
                    UserFacebookName: friends.friend.title.text,
                    UserFacebookid: friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.id,
                    FriendshipStatus: friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.friendship_status,
                    Gender: friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.gender ? friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.gender : "",
                    ShortName: friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.name,
                    ProfileURL: friends.friend.url,
                    UserFacebookImage: friends.friend.image.url ? friends.friend.image.url : "",
                    SubscribeStatus: friends.friend.actions_renderer.action.client_handler.profile_action.restrictable_profile_owner.friendship_status,
                    profileId: req.body.profileId,
                    desider:2
                    };
                const saveFriend=await FriendRepo.saveFBFriendDetails(FriendsList);
                
            }

        });
        
        let socketArray = {
            ScrapingStatus: req.body.has_next_page,
            ScrapingUser: req.body.User_id,
            ScrapingFacebookId: req.body.FBuserId,
            ScrapingKyubiId: req.body.kyubi_user_token,
            FriendType:'in-active'
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
