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

    //deleteMany
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
   
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    
    //challenge code
    db.collection('Users').deleteMany({name:'Mark'});
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b0336017f4319e0259029fc')
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    })

    // client.close();
});