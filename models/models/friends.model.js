const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    kyubi_user_token :  {
        type: String,
        default: ''
    },
    UserFacebookName: {
        type: String,
        default: ''
    },
    UserFacebookid: {
        type: String,
        default: ''
    },
    FriendshipStatus: {
        type: String,
        default: ''
    },
    Gender: {
        type: String,
        default: ''
    },
    ShortName: {
        type: String,
        default: ''
    },
    ProfileURL: {
        type: String,
        default: ''
    },
    UserFacebookImage:  {
        type: String,
        default: ''
    },
    SubscribeStatus:  {
        type: String,
        default: ''
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
// create the model for Users and expose it to our app
module.exports = FriendsSchema;