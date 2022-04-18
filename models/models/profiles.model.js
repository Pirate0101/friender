const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfilesSchema = new Schema({
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
    UserdtsgToken: {
        type: String,
        default: ''
    },
    UserFacebookImage:  {
        type: String,
        default: ''
    },
    UserFacebookUsername: {
        type: String,
        default: ''
    },
    UserdtsgExpire: {
        type: Number,
        default: 0
    },
    access_token: {
        type: String,
        default: ''
    },
    UsercollectionToken: {
        type: String,
        default: ''
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
// create the model for Users and expose it to our app
module.exports = ProfilesSchema;