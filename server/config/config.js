let env = process.env.NODE_ENV || 'development';
//either heroku or server-test.js will set this or it will default to development


if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env]; //create an object loading all the settings for a particular environment

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]; //add a process.env variable for each config setting
    });


}

// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
//     //27017 is the default port mongodb uses, you can create a collection through MONGODB_URI
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }