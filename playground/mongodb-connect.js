// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true}, (err, client) => {
    if (err) {
       return console.log('unable to connect to mongDB server');
    }
    console.log('connected to mongoDB server');
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //         text:'something to do',
    //         completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert Todo');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //insert new doc into users collection {name, age, location}
    
    // db.collection('Users').insertOne({
    //     name:'Mark',
    //     age: 30,
    //     location: 'Seattle'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('unable to insert User data', err);
    //     } 
    //     // console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();
});