const mongoose = require('mongoose');
const { Friend_Read,Friend_Write} = require('../models/moduleReadWrite');
const FriendsRepository   =   {
/**
* @saveUserDetails
* save User Details in mongo db
*/
    saveFriendsDetails: async (data) => {
    try {
        let FriendInfo = await  Friend_Write.insertMany(data);
        if (!FriendInfo) {
        return null;
        }
        return FriendInfo;
    } catch (e) {
        throw e;
    }
    }
}
module.exports = FriendsRepository;