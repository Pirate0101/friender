const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfilesSchema =require('../models/profiles.model');
mongoose.set('useFindAndModify', false);
const WriteConnection = mongoose.createConnection("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
const ReadConnection = mongoose.createConnection("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?readOnly=true&readPreference=secondary", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const WriteProfile =  WriteConnection.model('Profiles',ProfilesSchema);
const ReadProfile =  ReadConnection.model('Profiles', ProfilesSchema);

const ProfilesRepository   =   {
    /**
      * @GetProfileByParam
      * Get Profile As Per _id
    */
     GetProfileByParam: async (ProfileId,FacebookId) => {
      try {
        let ProfileInfo = await ReadProfile.findOne({ user_id : mongoose.Types.ObjectId(ProfileId), UserFacebookid:FacebookId}).exec();
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
      let UserInfo = await ReadProfile.findOne({ '_id': profileId }).exec();
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
        let ProfileInfoNew = await  WriteProfile.create(data);
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
      let UpdateUserInfo = await  WriteProfile.updateOne({ _id: profileId }, ProfileInfo).exec();
      // console.log("Already Associated with", ChatRoomUpdated);
      return UpdateUserInfo;
      } catch (error) {
        throw error;
      }
    },

/**
    * @UpdateProfileManyInfo
    * update Many Profile Info
*/
UpdateProfileManyInfo: async (UserId, ProfileInfo) => {
    try {
      let UpdateManyProfile = await  WriteProfile.updateMany({ user_id: UserId }, ProfileInfo).exec();
      // console.log("Already Associated with", ChatRoomUpdated);
      return UpdateManyProfile;
      } catch (error) {
        throw error;
      }
    },
/**
* @GetActiveProfile
* get the Active Profile info by a specified field from Mongo DB
*/
GetActiveProfile: async (id) => {
    try {
      let ProfileInfo = await ReadProfile.findOne({ 'user_id': mongoose.Types.ObjectId(id),'status':true }).exec();
      return ProfileInfo;
    } catch (e) {
      throw e;
    }
  },


  
  };
  
  module.exports = ProfilesRepository;