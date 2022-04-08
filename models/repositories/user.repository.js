const mongoose = require('mongoose');
const { User_Read,User_Write} = require('../models/moduleReadWrite');
const UsersRepository   =   {

  GetUserById: async (UserId) => {
    try {
      let UserInfo = await User_Read.aggregate([
        {
          $lookup:
          {
            from: 'profiles',
            localField: '_id',
            foreignField: 'user_id',
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
          $match: {
            'kyubi_user_token': UserId 
          }
        },
        {
          $group: {
            '_id': '$_id',
            kyubi_user_token: {
              $first: '$kyubi_user_token'
            },
            user_email: {
              $first: '$user_email'
            },
            plan: {
              $first: '$plan'
            },
            profile_count: {
              $first: '$profile_count'
            },
            status: {
              $first: '$status'
            },
            profilesinfo: {
              $push: '$profilesinfo'
            }
          }
        }
      ]).exec();
      return UserInfo;
    } catch (e) {
      throw e;
    }
  },
  
    /**
    * @saveUserDetails
    * save User Details in mongo db
  */
 saveUserDetails: async (data) => {
    try {
      let UserInfo = await  User_Write.create(data);
      if (!UserInfo) {
        return null;
      }
      return UserInfo;
    } catch (e) {
      throw e;
    }
  },

  /**
    * @UpdateUserInfo
    * update User Info
  */
 UpdateUserInfo: async (userId, UserInfo) => {
  try {
    let UpdateUserInfo = await  User_Write.updateOne({ _id: userId }, UserInfo).exec();
     console.log("Already Associated with", UpdateUserInfo);
    return UpdateUserInfo;
    } catch (error) {
      console.log("Already Associated with", error);
      throw error;
    }
  },


};

module.exports = UsersRepository;