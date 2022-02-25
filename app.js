const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const http = require('http');
const config = require('config')
const appRoutes = require('./routes/index')
const _ = require('underscore');
const engine = require('ejs-locals');
require('dotenv').config();

// Set up the express app
const app = express();
const port = process.env.PORT || 8081;
app.set('port', port);
const server = http.createServer(app);


//setting up the ejs template engine
app.set('views', [path.join(__dirname, './views')]);
app.engine('ejs', engine);
app.set('view engine', 'ejs'); // set up ejs for templating

server.listen(port, function (err, data) {
  console.log(`Friender running on port ${port}`)
});
/**
  * connecting the mongo db from mongoose.js in here
  * also in here we are creating the system generated tags when the
  * mongo connection is successfull
*/
// (async () => {
//     try {
//       await require(path.join(__dirname, 'database', 'mongoose'))();
//       console.log('Mongoose DB is connected');
//     } catch (error) {
//       console.log('Hey, i am in error block in where calling my mongo db connection to make it open once:: ', error);
//     }
//   })();
// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/lead-generation-back/build')));
app.use(express.static('./public'));
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*")
  next();
})
app.use('/', appRoutes);
app.use(helmet());
app.disable('x-powered-by');



module.exports = { app, server };