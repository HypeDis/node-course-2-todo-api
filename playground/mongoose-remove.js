const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/users');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b0c93607ad25e7d78c43341').then((todo) => {
    console.log(todo);
});