const UsersRepo = require('../../../models/repositories/user.repository');

module.exports.getOrStoreUser = async (req, res) => {
    try {
        console.log("This is my sent",req.body);
        res.send({
            code: 1,
            message: "Successfully User Added",
            payload: {}
        });
        
        
        
    } catch (error) {
        res.send({
            code: 3,
            message: error.message,
            payload: error
        })
    }
}

