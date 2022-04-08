const mongoose = require('mongoose');
const { Profile_Read,Profile_Write} = require('../models/moduleReadWrite');
const ProfilesRepository   =   {
    /**
      * @GetProfileByParam
      * Get Profile As Per _id
    */
     GetProfileByParam: async (ProfileId,FacebookId) => {
      try {
        let ProfileInfo = await Profile_Read.findOne({ user_id : mongoose.Types.ObjectId(ProfileId), UserFacebookid:FacebookId}).exec();
        return ProfileInfo;
      } catch (e) {
        throw e;
      }
    },
/**
    * @GetProfileById
    * Get Profile As Per _id
*/
 GetProfileById: async (profileId) => {
    try {
      let UserInfo = await Profile_Read.findOne({ '_id': profileId }).exec();
      return UserInfo;
    } catch (e) {
      throw e;
    }
  },
/**
     * @saveProfileDetails
     * save Profile Details in mongo db
*/
   saveProfileDetails: async (data) => {
      try {
        let ProfileInfoNew = await  Profile_Write.create(data);
        if (!ProfileInfoNew) {
          return null;
        }
        return ProfileInfoNew;
      } catch (e) {
        throw e;
      }
    },

    

/**
    * @UpdateProfileInfo
    * update Profile Info
*/
    UpdateProfileInfo: async (profileId, ProfileInfo) => {
    try {
      console.log("51");
      let UpdateUserInfo = await  Profile_Write.updateOne({ _id: profileId }, ProfileInfo).exec();
      console.log("54");
      return UpdateUserInfo;
      } catch (error) {
        throw error;
      }
    },

/**
    * @UpdateProfileManyInfo
    * update Many Profile Info
*/
UpdateProfileManyInfo: async (UserId,UserFacebookid, ProfileInfo) => {
    try {
      
      let UpdateManyProfile = await  Profile_Write.updateMany({ 'user_id': mongoose.Types.ObjectId(UserId), 'UserFacebookid':UserFacebookid}, ProfileInfo).exec();
      
      return UpdateManyProfile;
      } catch (error) {
        throw error;
      }
    },

/**
* @GetActiveProfile
* get the Active Profile info by a specified field from Mongo DB
*/
UpdateProfile: async (id, ProfileInfoDetails) => {
    try {
      console.log("81");
      let ProfileInfo = await Profile_Write.updateMany({ 'user_id': mongoose.Types.ObjectId(id)}, ProfileInfoDetails).exec();
      console.log("84");
      return ProfileInfo;
    } catch (e) {
      throw e;
    }
  },


  
  };
  
  module.exports = ProfilesRepository;