const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id:10
};

var token = jwt.sign(data, '123abc');
// jwt.verify
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
// let message = "I am user number 3";

// let hash = SHA256(message)//.toString();
// let hashToString = SHA256(message).toString();

// console.log('Message:', message);
// console.log("hash: ", hash, hashToString );

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id=5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');

// }else if (resultHash != token.has){
//     console.log("Data was changed, dont trust.");
// }