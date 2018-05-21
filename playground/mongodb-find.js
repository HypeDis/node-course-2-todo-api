// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true}, (err, client) => {
    if (err) {
       return console.log('unable to connect to mongDB server');
    }
    console.log('connected to mongoDB server');
    const db = client.db('TodoApp')

    // db.collection('Todos').find({
    //     _id:new ObjectID('5b00b8691e199f4669738b60')
    // }).toArray().then((docs) => {
    //     console.log('todos');
    //     console.log(JSON.stringify(docs, undefined,  2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('todos');
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('Users').find({name:'Mark'}).toArray().then((docs)=> {
        console.log(docs);
    }, (err) => {
        console.log('unable to fetch data');
    });

    // client.close();
});