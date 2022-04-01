const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const UsersSchema = require('../models/users.model');
// mongoose.set('useFindAndModify', false);
// const WriteConnection = mongoose.createConnection("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?retryWrites=true&w=majority", {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true 
// });
// const ReadConnection = mongoose.createConnection("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?readOnly=true&readPreference=secondary", {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true 
// });
//console.log("Please do it",WriteConnection);
const { User_Read,User_Write} = require('../models/moduleReadWrite');
// const WriteUser =  WriteConnection.model('Users',UsersSchema)
// const ReadUser =  ReadConnection.model('Users', UsersSchema);
const UsersRepository   =   {
  /**
    * @GetUserById
    * Get user As Per _id
  */
 GetUserById: async (UserId) => {
    try {
      let UserInfo = await User_Read.findOne({ 'kyubi_user_token': UserId }).exec();
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
    let UpdateUserInfo = await  User_Write.updateOne({ kyubi_user_token: userId }, UserInfo).exec();
     console.log("Already Associated with", UpdateUserInfo);
    return UpdateUserInfo;
    } catch (error) {
      console.log("Already Associated with", error);
      throw error;
    }
  },


};

module.exports = UsersRepository;