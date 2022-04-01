const mongoose = require('mongoose');
/**
  * Defining the db name, hosts, user and password for setting up mongo db connection
*/

let secondryDbUrl = 'mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?retryReads=true&retryWrites=false&readPreference=secondary';
let primaryDbUrl = 'mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?retryWrites=true&w=majority';

mongoose.ReadConnection = mongoose.createConnection(secondryDbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.WriteConnection = mongoose.createConnection(primaryDbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


module.exports = mongoose;


// module.exports.WriteConnection = async () => {
//   try {
//     mongoose.set('useFindAndModify', false);
//     return await mongoose.createConnection("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?retryWrites=true&w=majority", {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true 
//     });
    
//     console.log('Yes, Mongo DB connected successfully, have fun!');
//   } catch (error) {
//     console.error('I am in mongo db connection error block :: ', error);
//   }
// }
// module.exports.ReadConnection = async () => {
//   try {
//     mongoose.set('useFindAndModify', false);
//     return await mongoose.createConnection("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?readOnly=true&readPreference=secondary", {
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true 
//     });
    
//     console.log('Yes, Mongo DB connected successfully, have fun!');
//   } catch (error) {
//     console.error('I am in mongo db connection error block :: ', error);
//   }
// }