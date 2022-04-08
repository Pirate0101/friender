const mongoose = require('mongoose');
const { Friendscount_Read,Friendscount_Write} = require('../models/moduleReadWrite');

const FriendcountsRepository   =   {
    /**
      * @GetFriendCountByParam
      * Get Profile As Per _id
    */
     GetFriendCountByParam: async (UserId,FacebookId) => {
      try {
        let FriendCountInfo = await Friendscount_Read.findOne({ user_id : mongoose.Types.ObjectId(UserId), UserFacebookid:FacebookId}).exec();
        return FriendCountInfo;
      } catch (e) {
        throw e;
      }
    },
        /**
    * @saveUserDetails
    * save User Details in mongo db
  */
 saveFriendCountDetails: async (data) => {
  try {
    let UserInfo = await  Friendscount_Write.create(data);
    if (!UserInfo) {
      return null;
    }
    return UserInfo;
  } catch (e) {
    throw e;
  }
},
/**
    * @UpdateFriendCountManyInfo
    * update Many Profile Info
*/
UpdateFriendCountManyInfo: async (UserId,UserFacebookid, FriendCOuntInfo) => {
  try {
    
    let UpdateManyProfile = await  Friendscount_Write.updateMany({ 'user_id': mongoose.Types.ObjectId(UserId), 'UserFacebookid':UserFacebookid}, FriendCOuntInfo).exec();
    
    return UpdateManyProfile;
    } catch (error) {
      throw error;
    }
  },
}
module.exports = FriendcountsRepository;