const mongoose = require('mongoose');
// const test = 2*4;

mongoose.Promise = global.Promise; //uses default promise library
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };