const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendcountSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    kyubi_user_token :  {
        type: String,
        default: ''
    },
    UserFacebookid: {
        type: String,
        default: ''
    },
    totalCount: {
        type: Number,
        default: 0
    },
    totalActive:  {
        type: Number,
        default: 0
    },
    totalScrap: {
        type: Number,
        default: 0
    },
    ScrapingStatus: {
        type: Boolean,
        default: false 
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
module.exports = FriendcountSchema;