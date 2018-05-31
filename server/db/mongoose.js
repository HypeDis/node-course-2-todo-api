const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //uses default promise library
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };

