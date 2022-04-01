const UsersSchema = require('../models/users.model');
const {WriteConnection,ReadConnection} =require('../../database/mongoose')
module.exports =    {
    "User_Read" :   ReadConnection.model('Users',UsersSchema),
    "User_Write" :   WriteConnection.model('Users',UsersSchema),
}