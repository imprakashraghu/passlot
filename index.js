'use strict';

const h = require('./helper');
const enc = require('./encode');
const dec = require('./decode');

// check method to check with default or user defined conditions through options parameter

/**
 * @function check()
 * 
 * first paramter : string 'required'
 * 
 * second parameter : options 'optional'
 * 
 * returns a object contains status and message
 * if the object status returns true the password is good and no message will delivered
 * if the object status is false the password is not good and a warning message will be delivered
 * 
*/

let check = (str, options) => {
    return h.check(str, options);
}

/**
 * @function encode()
 * 
 * first parameter : string 'required' (password need to be encrypted)
 * 
 * second parameter : string 'optional' (seceret key of yours)
 * 
 * returns an encrypted string using passlot own method
 * 
 * Note: if you specify the custom key for encrypting a password, 
 * do not forget to use the same custom key for decrypting it
*/

let encode = (str, key) => {
    return enc.encrypt(str, key);
}

/**
 * @function decode()
 * 
 * first parameter : string 'required' (password need to be decrypted)
 * 
 * second parameter : string 'optional' (seceret key of yours)
 * 
 * returns an decrypted string using passlot own method
 * 
*/

let decode = (str, key) => {
    return dec.decrypt(str, key);
}


module.exports = {
    check,
    encode,
    decode
}


