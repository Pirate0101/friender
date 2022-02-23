const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Number,
        default: 0,
        enum: [0, 1]
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
module.exports = mongoose.model('Users', UsersSchema);