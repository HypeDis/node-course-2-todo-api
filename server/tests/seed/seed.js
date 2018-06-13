//this file moves all of the seed database creation for server-test in to its own file to keep things from getting too cluttered


const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID(); // need to create the user id here so that jwt.sign can use the value. 

const users = [{
    _id: userOneId,
    email: 'mark@gmail.com',
    password: 'user1pass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: new ObjectID(),
    email: 'abe@example.com',
    password: 'user2pass'

}]

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

console.log(users[0]._id);

module.exports = { todos, populateTodos, users, populateUsers };