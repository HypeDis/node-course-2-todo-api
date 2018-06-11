let env = process.env.NODE_ENV || 'development'; //either heroku or server-test.js will set this or it will default to development
// console.log('env****', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    //27017 is the default port mongodb uses, you can create a collection through MONGODB_URI
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}