 const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {WriteConnection,ReadConnection} = require('../../database/mongoose');
//console.log("Please do it",WriteConnection);
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
//console.log("Please do it",WriteConnection);
const UsersSchema = new Schema({
    kyubi_user_token: {
        type: String,
        default: ''
    },
    user_email: {
        type: String,
        default: ''
    },
    plan: {
        type: Number,
        default: 0
    },
    profile_count: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true 
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    }
});
const WriteUser =  WriteConnection.model('Users',UsersSchema)
const ReadUser =  ReadConnection.model('Users', UsersSchema);
const UsersRepository   =   {
  /**
    * @GetUserById
    * Get user As Per _id
  */
 GetUserById: async (UserId) => {
    try {
      let UserInfo = await ReadUser.findOne({ 'kyubi_user_token': UserId }).exec();
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
      let UserInfo = await  WriteUser.create(data);
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
    let UpdateUserInfo = await  ReadUser.updateOne({ kyubi_user_token: userId }, UserInfo).exec();
    // console.log("Already Associated with", ChatRoomUpdated);
    return UpdateUserInfo;
    } catch (error) {
      throw error;
    }
  },


};

module.exports = UsersRepository;