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
    },
/** 
    * @saveFBFriendDetails
    * save Profile Details in mongo db
*/
    saveFBFriendDetails: async (data) => {
     try {
       let FriendInfo = await  Friend_Write.create(data);
       if (!FriendInfo) {
         return null;
       }
       return FriendInfo;
     } catch (e) {
       throw e;
     }
   },

    // },
    CheckFriendsDetails: async (friendId,UserId,profileId) => {
        try {
            let FriendInfo = await  Friend_Read.find({'user_id': mongoose.Types.ObjectId(UserId),'profileId':mongoose.Types.ObjectId(profileId),'UserFacebookid':  friendId }).count();
            if (!FriendInfo) {
            return null;
            }else{
                return FriendInfo;
            }
            
        } catch (e) {
            throw e;
        }
        },
    CheckFriendsCounts: async (UserId,profileId) => {
      try {
          let FriendInfo = await  Friend_Read.find({'user_id': mongoose.Types.ObjectId(profileId),'profileId':mongoose.Types.ObjectId(profileId) }).countDocuments();
          if (!FriendInfo) {
          return null;
          }else{
              return FriendInfo;
          }
          
      } catch (e) {
          throw e;
      }
      },
    findFriendsBase: async (id,fid) => {
    try {
        let FriendInfo = await Friend_Read.aggregate([
            {
              $lookup:
              {
                from: 'profiles',
                localField: 'profileId',
                foreignField: '_id',
                as: 'profilesinfo'
              }
            },
            {
              $unwind: {
                path: '$profilesinfo',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $match: {'user_id': mongoose.Types.ObjectId(id),'profileId':  mongoose.Types.ObjectId(fid) }
            },
            {
              $group: {
                '_id': '$_id',
                FriendFacebookid: {
                  $first: '$UserFacebookid'
                },
                ProfileURL: {
                  $first: '$ProfileURL'
                },
                profileId: {
                  $first: '$profileId'
                },
                UserFacebookId: {
                  $first: '$profilesinfo.UserFacebookid'
                },
                UserdtsgToken:{
                    $first: '$profilesinfo.UserdtsgToken'
                }
              }
            }
          ]).exec();
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