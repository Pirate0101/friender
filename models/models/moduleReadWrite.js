const UsersSchema = require('../models/users.model');
const ProfilesSchema    =require('../models/profiles.model')
const FriendsSchema =require('../models/friends.model');
const FriendcountSchema =   require('../models/friendcount.model');
const {WriteConnection,ReadConnection} =require('../../database/mongoose')
module.exports =    {
    "User_Read" :   ReadConnection.model('Users',UsersSchema),
    "User_Write" :   WriteConnection.model('Users',UsersSchema),
    "Profile_Read" :   ReadConnection.model('Profiles',ProfilesSchema),
    "Profile_Write" :   ReadConnection.model('Profiles',ProfilesSchema),
    "Friend_Write" :   WriteConnection.model('Friends',FriendsSchema),
    "Friend_Read" :   ReadConnection.model('Friends',FriendsSchema),
    "Friendscount_Write" :   WriteConnection.model('Friendscount',FriendcountSchema),
    "Friendscount_Read" :   ReadConnection.model('Friendscount',FriendcountSchema)
    
}