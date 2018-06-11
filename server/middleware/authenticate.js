//'authenticate' is mongoose middleware
let { User } = require('./../models/user');


let authenticate = (req, res, next) => {//checks if token exists in database
    let token = req.header('x-auth'); //gets the token from the header passed in from postman

    User.findByToken(token).then((user) => {//run the findbytoken method in user.js
        if (!user) {
            return Promise.reject();//ends authenticate if user does not exist
        }
        req.user = user; 
        req.token = token;
        next(); //next() is a mongoose middleware call that allows the next function in line to run. 
    }).catch((e) => {
        res.status(401).send();
    });
    
};

module.exports = { authenticate };

