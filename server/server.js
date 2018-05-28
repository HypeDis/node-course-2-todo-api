const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose.js');
const { Todo } = require('./models/todo.js');
const { Users } = require('./models/users.js');

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
    //validate id
    //404 -send back 

    //findbyid
    //success
    //if todo send it back
    //if no todo send back 404 empty body 
    //error case
    //send back 400 - and send empty body
});

app.listen(port, () => {
    console.log('Started on port port', port);
});

module.exports = { app };