require('./config/config');


const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo.js');
const { User } = require('./models/user.js');
const { authenticate } = require('./middleware/authenticate.js');


let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);

    }, (e) => {
        // console.log(res.status);
        res.status(400).send(e);
    });
});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });

});

// get /todos/12342134
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('404 id is invalid');
    }
    Todo.findById(id).then((todo) => {
        if (todo) {
            res.status(200).send({ todo });
        } else {
            res.status(404).send('id does not exist');
        }
    }, (e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('404 id is invalid');
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        else {

            return res.status(200).send({ todo });
        }
    }).catch((e) => {
        res.status(400).send();
    });
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('404 id is invalid');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => { //generates an auth token when an email and password are passed in. _id and email are returned.
    let body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });

});

app.get('/users/me', authenticate, (req, res) => { //returns a users _id and email when a x-auth token is passed in
    res.send(req.user);
});


app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {//check if user and password are valid

        if (user === null) {

            return res.status(400).send('user or p/w incorrect');
        }
        return user.generateAuthToken().then((token) => { //generate a new auth token
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => { //delete a token from a user document 
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log('Started on port', port);
});

module.exports = { app };