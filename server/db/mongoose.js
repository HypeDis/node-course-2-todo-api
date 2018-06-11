const mongoose = require('mongoose'); //import the mongoose package

mongoose.Promise = global.Promise; //uses default promise library instead of mongooses own promise methods
mongoose.connect(process.env.MONGODB_URI); //location of the mongoDB based on config.js or set by heroku

module.exports = { mongoose }; //export mongoose with all the settings here.

