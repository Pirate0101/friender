const FriendCountRepo = require('../../../models/repositories/friendcount.repository');
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
    try {

        let FriendsList = [];
        let TotalFriend = 0;
        await req.body.friends.map(async (friends, key) => {

            console.log(friends);

            FriendsList.push({
                user_id: req.body.User_id,
                kyubi_user_token: req.body.kyubi_user_token,
                UserFacebookName: friends.friend.node.id,
                UserFacebookid: friends.friend.node.id,
                FriendshipStatus: friends.friend.actions_renderer.action.profile_owner.friendship_status,
                Gender: friends.friend.client_handler ? friends.friend.client_handler.restrictable_profile_owner.gender : "",
                ShortName: friends.friend.title.text,
                ProfileURL: friends.friend.url,
                UserFacebookImage: friends.friend.image.uri,
                SubscribeStatus: friends.friend.is_active,
                profileId: req.body.profileId
            });
            //await FriendRepo.saveFBFriendDetails(FriendsListNew);
            TotalFriend = key + 1;



        })
        console.log("I ammmmmmmmmmm", FriendsList)
        await FriendRepo.saveFriendsDetails(FriendsList);
        let FriendsCount = await FriendCountRepo.GetFriendCountByParam(req.body.User_id, req.body.FBuserId);
        if (FriendsCount) {
            let friendcountArray = {

                totalCount: req.body.totalFriends,
                totalActive: 0,
                totalScrap: FriendsCount.totalScrap + TotalFriend,
                ScrapingStatus: req.body.has_next_page
            }

            let UpdateFriends = await FriendCountRepo.UpdateFriendCountManyInfo(req.body.User_id, req.body.FBuserId, friendcountArray);
            if (UpdateFriends) {
                let socketArray = {
                    totalCount: req.body.totalFriends,
                    totalScrap: FriendsCount.totalScrap + TotalFriend,
                    ScrapingStatus: req.body.has_next_page,
                    end_cursor: req.body.end_cursor
                }

                let Room = req.body.kyubi_user_token;
                socketc.emit('requestUserFacebookFriendsEmit', { socketArray, Room });
                res.send({
                    code: 1,
                    message: "Successfully Added User Friends",
                    payload: FriendsList
                });
            }

        } else {
            let friendcountArray = {
                user_id: req.body.User_id,
                kyubi_user_token: req.body.kyubi_user_token,
                UserFacebookid: req.body.FBuserId,
                totalCount: req.body.totalFriends,
                totalActive: 0,
                totalScrap: TotalFriend,
                ScrapingStatus: req.body.has_next_page
            }
            let UpdateFriends = await FriendCountRepo.saveFriendCountDetails(friendcountArray);
            if (UpdateFriends) {
                let socketArray = {
                    totalCount: req.body.totalFriends,
                    totalScrap: FriendsCount.totalScrap + TotalFriend,
                    ScrapingStatus: req.body.has_next_page,
                    end_cursor: req.body.end_cursor
                }

                let Room = req.body.kyubi_user_token;
                socketc.emit('requestUserFacebookFriendsEmit', { socketArray, Room });
                res.send({
                    code: 1,
                    message: "Successfully Added User Friends",
                    payload: FriendsList
                });
            }
        }

        console.log("This Are the Friends Info",)
    } catch (error) {
        res.send({
            code: 1,
            message: error,
            payload: req.body
        });
    }
    //let getProfileInfo = await FriendCountRepo.GetFriendCountByParam(req.body.user_id,req.body.UserFacebookid);
    // if(getProfileInfo){
    //     res.send({
    //         code: 1,
    //         message: "Successfully Added User Friends",
    //         payload: req.body
    //     });
    // }else{
    //     //let getProfileInfo = await FriendCountRepo.saveFriendCountDetails(req.body);
    //     res.send({
    //         code: 1,
    //         message: "Successfully Added User Profile222",
    //         payload: {}
    //     });
    // }

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
