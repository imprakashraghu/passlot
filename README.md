# Password Helper module for Nodejs

[![GitHub License](https://img.shields.io/github/license/prakashjaw/passlot)](https://github.com/prakashjaw/passlot/blob/master/LICENSE)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Release Version](https://img.shields.io/badge/release-v1.0.0-green)
[![Module Author](https://img.shields.io/badge/author-prakashjaw-blue)](https://prakashjaw.bss.design)

Passlot is a simple password helper module used to validate using your own condition, encrypt and decrypt.

  - Validation with custom conditions
  - Encrypt Data
  - Decrypt Data

### Installation

Passlot requires [Node.js](https://nodejs.org/) and npm (Node Package Manager).

```cmd
npm install passlot
```
### Usage

```
const passlot = require('passlot');
var password = 'pass123';

let options = { // optional
    len: 8,
    type: 'alphanumeric',
    case: false
} 
let validate = passlot.check(password, options);
if(!validate.status) {
    console.log(validate.message); // Password should contain atleast 8 characters.
}

console.log(passlot.encode('password123')); // ddfsdfjndkf829rnmfom
console.log(passlot.decode('')); // password123

// secret key is optional
console.log(passlot.encode('password123', 'my_secret_key')); // dsfsdffj2jk2rkjje
```

### Description

Passlot comes with more handy options to the all the methods use in here.
check (password, options )
| Title | Description  | Type |
| ------ | ------ | ------ |
| password | password given by user | String |
| options.len | maximum length of the password | Number |
| options.type | can be 'alpha', 'numeric', 'alphanumeric' | String |
| options.case | password contains special characters, can be true or false | Boolean |

Want to contribute? Great!

Open your favorite project use these functionalities.

### Todos

 - Write MORE Tests
 - Add Object Encryption

License
----

MIT


**Free Software, Hell Yeah!**
