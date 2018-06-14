const mongoose = require('mongoose');
const validator = require('validator'); //validates various types of input. we are using this to validate an email is formatted correctly
const jwt = require('jsonwebtoken'); //
const _ = require('lodash');
const bcrypt = require('bcryptjs');



let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true, //removes blank spaces from the ends of the string
        unique: true, //when false it throws a duplicate key error instead of a validation error.
        validate: { //this is how you create a custom validation
            validator: validator.isEmail, //the validation method. this function  returns true or false based on the email string passed in.
            //Validators always receive the value to validate as their first argument (from mongoose api docs)
            message: `{VALUE} is not a valid email` //returned when validator is false
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {   _id: false, //stops mongoose from creating an _id inside of tokens[] b/c it thinks it is a subdocument.
            access: {
                type: String,
                required: true,

            },
            token: {
                type: String,
                required: true

            }
        }]
});

UserSchema.methods.toJSON = function () {

    //this function is called when res.send is used by express 
    // instead of the default toJSON function so that we can hide sensitive information from the user

    let user = this; //'this' is user JSON from mongodb
    let userObject = user.toObject(); //turns the json user data into an object
    return _.pick(userObject, ['_id', 'email']); //picks what data we want to share when a response is called. 
}

//.methods is used for an instance(example: get the email for a particular user) of the 'users' collection
//.statics is used when you need to do something that involves the entire collecion(example: find a user by a certain attribute);

UserSchema.methods.generateAuthToken = function () { //generates the webtoken for user authentication
    let user = this; //'this' refers to the user object created in "app.post('/users')" by "let user = new User(body)" since it is called inside of it using "user.generateAuthToken"
    let access = 'auth'; //this variable just tells us the purpose of the token being generated. 
   
    let token = jwt.sign({ _id: user._id, access }, 'abc123').toString();
    //first param for jwt.sign is the string you want to pass in to generate a token
    //we use an object b/c we want to pass in the _id  and purpose of the token (access) so we can have different access values for different purposes (login, p/w reset etc...)
    //2nd param is a private key used during token generation

    // user.tokens.push({access,token}); <--doesnt work for some people.
    user.tokens = user.tokens.concat([{ access, token }]); //had to use concat because push doesnt work properly (concat merges 2 arrays in to 1 array) [a,b].concat([c,d]) becomes [a,b,c,d]
    return user.save().then(() => { //re-saves the user object with the newly generated token included.
        return token;
    });
};

UserSchema.statics.findByToken =  function (token) { //finds a user based on the token value
    
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123'); 
        //jwt.verify makes sure that if the token has been tampered with on the client side 
        // it will be rejected if the private key does not match on the server-side.
    } catch (e) {
        return Promise.reject(); //return the error if jwt.verify is not successful
    };
    return User.findOne({ 
        //this is a built-in mongoose static static helper functions 
        // http://mongoosejs.com/docs/queries.html
        
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) { //this method is called before save.
    let user = this; 
    if ( user.isModified('password')) {//check if pw is modified. creating a new account is by default modified
        bcrypt.genSalt(10, (err, salt) => {//generates a salt to use when hashing the password
            bcrypt.hash(user.password, salt, (err, hash) => { //hashes the password with the generated salt.
                //sidenote: when a user tries to log in the server will provide the salt 
                // and rehash the inputted password and check against the hashed password on the database.
                user.password = hash; //change user password to the hash
                next(); 
                });
        });
    } else { //if password hasn't been modified, skip hash generation.
        next();
    }
});

UserSchema.statics.findByCredentials = function (email, password) { //pass in email and password and validate them
    let User = this;

    return User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve, reject) => { //bcrypt is async so we need to create a new promise to handle it
            //use bcrypt.compare password and user.password
            bcrypt.compare(password, user.password, (err, res) => {
                if(err || res === false){ 
                    reject();
                }
                else if(res === true){
                    resolve(user); //return the user object if bcrypt.compare returns true
                }
               
            });
        });
    });
}

let User = mongoose.model('User', UserSchema); //1st param is collecion name. mongoose will create a plural version called 'users' in lowercase.
// the 2nd param is the schema that will be used..

module.exports = { User };