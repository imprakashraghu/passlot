'use strict';

const crypto = require('crypto');
const helper = require('../helper');

var ENCRYPTION_KEY = "passlotbelongstoprakashjaw";

// decrypt the given password

let decrypt = (str, key=ENCRYPTION_KEY) => {

    // validate the string given
    helper.vHelper('string to be decoded', str);

    // stage 01 convert the given string into array
    let temp_string_array = Array.from(str);

    // stage 02 separate the swap indices from the found array
    let swapIndices = [];
    
    swapIndices[2] = [temp_string_array[0],temp_string_array[1],temp_string_array[2]];
    swapIndices[1] = [temp_string_array[3],temp_string_array[4],temp_string_array[5]];
    swapIndices[0] = [temp_string_array[6],temp_string_array[7],temp_string_array[8]];

    // stage 03 remove the swap indices characters from the given string
    let temp_extracted_string = str.slice(0,9);
    
    // declare the temp string array from extracted string
    let temp_string_e_array = Array.from(str.slice(9,str.length));
    
    // declare limit for iteration
    let limit = 2;

     // have the extracted random index inside the swapindices
     for(var j in swapIndices) {
        
        // get the random index from indices array
        let randomindex = swapIndices[j][1];
        
        // get the original character from the indices array
        let tempChar = swapIndices[j][0];          
        
        // stage 04 swap the converted characters inside the extracted string      

            // replace the temporary character in the extracted string
            temp_string_e_array[randomindex] = tempChar;                                

            // decrement the limit
            limit--;

            // check the limit for every iteration so that it stops and breaks out of loop
            if(limit === -1) {
                break;
            }        

     }        

    // stage 05 conver the array into a string that can be decoded
    let temp_string_tobe_decoded = temp_string_e_array.join('');

    // stage 06 convert the hex string into normal utf-8 encoded string using crypto
    let normalString =  dec(temp_string_tobe_decoded, key);

    // return the final decrypted string
    return normalString;

}

function dec(text ,key) {
   
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
        decipher = crypto.createDecipheriv("aes256", keys, resizedIV);

    decipher.update(text, 'hex', 'utf-8');

    return decipher.final("utf-8");
}

module.exports = {
    decrypt
}