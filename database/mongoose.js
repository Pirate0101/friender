const mongoose = require('mongoose');
/**
  * Defining the db name, hosts, user and password for setting up mongo db connection
*/
module.exports = async () => {
  try {
    await mongoose.connect("mongodb+srv://frienderUser101:Password1234@cluster0.7jayb.mongodb.net/friender?retryWrites=true&w=majority", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
    mongoose.set('useFindAndModify', false);
    console.log('Yes, Mongo DB connected successfully, have fun!');
  } catch (error) {
    console.error('I am in mongo db connection error block :: ', error);
  }
}