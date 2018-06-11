const jwt = require('jsonwebtoken');


let token1 = jwt.sign({_id:12312444, name: 'mark', age:23}, 'abc123').toString();

let intercept = jwt.decode(token1);
intercept.name = 'david';
console.log(intercept);
// console.log(token);
let token2 = jwt.sign(intercept, '112323');
console.log(token2);
let tryHack = jwt.verify(token2, 'abc123');
console.log(tryHack);// let key = 'abc123';

// try{
//     let decode = jwt.verify(token, key)
//     console.log(decode);
// } catch (e) {
//     console.log(e);
// }
