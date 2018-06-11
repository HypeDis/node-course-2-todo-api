let obj = {
    id: 'mark',
    tokens: []
}

// console.log('original object', obj);

let concatObj = { token: 123, access: 'auth' };
let concatObj2 = { token: 23554, access: 'pasword-reset' };
// let a = arr[0].access;
// let t = arr[0].token;

obj.tokens = obj.tokens.concat([concatObj]);
console.log('******obj', obj);
obj.tokens = obj.tokens.concat([concatObj2]);
console.log('*****obj+', obj);
// console.log('original array', arr);

// obj.token = obj.token.concat([{ access, token }]);

// console.log('concat', obj);