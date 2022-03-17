const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendcountSchema =require('../models/friendcount.model');
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

const WriteFriendCount =  WriteConnection.model('FriendCount',FriendcountSchema);
const ReadFriendCount =  ReadConnection.model('FriendCount', FriendcountSchema);


const FriendcountsRepository   =   {
    /**
      * @GetFriendCountByParam
      * Get Profile As Per _id
    */
     GetFriendCountByParam: async (UserId,FacebookId) => {
      try {
        let FriendCountInfo = await ReadFriendCount.findOne({ user_id : mongoose.Types.ObjectId(UserId), UserFacebookid:FacebookId}).exec();
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
    let UserInfo = await  WriteFriendCount.create(data);
    if (!UserInfo) {
      return null;
    }
    return UserInfo;
  } catch (e) {
    throw e;
  }
}
}
module.exports = FriendcountsRepository;