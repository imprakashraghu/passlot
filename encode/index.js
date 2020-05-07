'use strict';

const crypto = require('crypto');
const helper = require('../helper');

var ENCRYPTION_KEY = "passlotbelongstoprakashjaw";

// encrypt given password

let encrypt = (str, key=ENCRYPTION_KEY) => {

    // validate the string given
    helper.vHelper('string to be encoded', str);

    // stage 01 convert string into hex using crypto        
    let hexString =  enc(str, key);

    // stage 03 define a three sized array called indices for storing swapping characters
    let swapIndices = [];

    // declare the hexstring array
    let hexstring_array = Array.from(hexString);

    // declare a array to store random index
    let indexes = [];

    // declare a limit variable to stop the iteration of swapping the hexstring to 3
    let limit = 0;

    // declare a character string that can used
    let charString = 'abcdefghijklmnopqrstuvwxyz';

    // stage 04 iterate through the hexstring and swap characters randomly
    for(let i in hexstring_array) {

        // have a random index inside the hexstring 
        let randomIndex = Math.floor(Math.random() * 9);        
        
        // have a random character that need to be swapped while the iteration
        let randomChar = Array.from(charString)[Math.floor(Math.random() * charString.length)];        

            // store the original character in a temporary variable
            let tempChar = hexstring_array[randomIndex];            
            
            // replaces the character with the random character defined with the random index            
            hexstring_array[randomIndex] = randomChar;            

            // now store the original character and random index for future decrypting
            let temp_indx = [tempChar,randomIndex.toString(),randomChar];
            
            swapIndices.push(temp_indx);


        // increment the limit to stop the iteration
        limit++;

        // check th limit for every iteration so that it stops and breaks out of loop when at 3
        if(limit === 3) {
            break;
        }
    }
        
    // stage 05 add the swap indices to the hexstring
    for(let x in swapIndices) {          
        hexstring_array = [...swapIndices[x], ...hexstring_array];        
    }
        
    // stage 06 return the final encrypted string
    return hexstring_array.join('');

}



function enc(text, key) {

    const resizedIV = Buffer.allocUnsafe(16);
    const iv = crypto
            .createHash("sha256")
            .update("myHashedJAW")
            .digest();
    iv.copy(resizedIV);

    const keys = crypto
        .createHash("sha256")
        .update(key)
        .digest(),
        cipher = crypto.createCipheriv("aes256", keys, resizedIV)
    
    cipher.update(text, 'utf-8', 'hex');

    return cipher.final("hex");

}

module.exports = {
    encrypt
}