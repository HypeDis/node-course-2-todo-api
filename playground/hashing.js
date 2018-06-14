const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';
let hashedPassword = new String;

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('hash', hash);
        hashedPassword = hash;
        bcrypt.compare(password, hashedPassword, (err, res) => {
            console.log('result', res);
        })
    });
});
let hash2 = '$2a$10$UKSAJecnRnwUBvwHCpuKMefqpf9Ucbz5bZx.C/0Fd7r5vOIEGICRG';
let hash3 = '$2a$10$R21R1Zd1Gc/hQrHtuj0BxuKc9Rqy7771vI0J.7uv6HCG8wfm7RKwi';
bcrypt.compare(hash3, password, (err,res) => {
    console.log('res2', res);
});

// let password_2 = 'abc123!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password_2, salt, (err, hash) => {
//         console.log('hash_2', hash);
//         bcrypt.compare(password_2, hash, (err, res) => {
//             console.log(res);
//         });
//     });
// });



// bcrypt.compare(password, hashedPassword, (err, res) => {
//     console.log(res);
// });

// var data = {
//     id:10
// };

// var token = jwt.sign(data, '123abc');
// // jwt.verify
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
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

