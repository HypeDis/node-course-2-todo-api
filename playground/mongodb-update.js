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

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b032e9f7f4319e0259027b1")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })
    //change name to mark and increment age by 1
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5aff75ec97d7410964ced27d")
    },{
        $set:{
            name:'Mark'
        },
        $inc:{
            age:1
        }    
    }, {
        returnOriginal:false
    }).then((result) =>{
        console.log(result);
    })
    // client.close();
});