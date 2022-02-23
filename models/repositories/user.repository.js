const User = require('../models/users.model');
const mongoose = require('mongoose');
const UsersRepository   =   {
  /**
    * @GetUserById
    * Get user As Per _id
  */
 GetUserById: async (UserId) => {
    try {
      let UserInfo = await User.findOne({ 'kyubi_user_token': UserId }).exec();
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
      let UserInfo = await User.create(data);
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
    let UpdateUserInfo = await User.updateOne({ kyubi_user_token: userId }, UserInfo).exec();
    // console.log("Already Associated with", ChatRoomUpdated);
    return UpdateUserInfo;
    } catch (error) {
      throw error;
    }
  },


};

module.exports = UsersRepository;