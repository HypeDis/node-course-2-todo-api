const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users');

var userId = '5b049793dc568a328c45a28d';
// go to user collection 
//user.findbyID
//user not found
//user found
//error handling

if (!ObjectID.isValid(userId)) {
    console.log('id not valid');
}

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('user not found');
    }
    console.log(JSON.stringify(user, undefined, 2))
}, (e) => console.log(e.message));


// var id = '5b08ab352a7e361d3c17b5ed';

// if(!ObjectID.isValid(id)) {
//     console.log('id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// 

