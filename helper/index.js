'use strict';

// validate the password with given conditions

    let defaultOptions = {
        len: 6,
        type: 'alpha',
        case: false
    }

let check = (str, options=defaultOptions) => {
    
    // validate the provided options
    
    let validation = validateOptions(options);       
    if(validation) {

        // good options

        if(options.case) {
            // case if true
            
            let checkcase = checkCase(str);            

            if(checkcase === 'true') {
                // valid case specified

                // check for password length
                let checkLen = checkLength(str, options.len);   
                                  
                if(checkLen === 'true') {
                    // a valid length                
                    let checktype = checkType(str, options.type, options.case);   
                    
                    if(checktype === 'true') {
                        // a valid type
                        return {status: true};
                    } else {
                        return {status: false, message: checktype};
                    }             
                    
                } else {                 
                    return {status: false, message: checkLen};
                }            
                        
                
            } else {
                // not valid case specified                
                return {status: false, message: checkcase};
            }
             
        } else {
            // case if false

            // check for password length
            let checkLen = checkLength(str, options.len);                                                 
            if(checkLen === 'true') {
                // a valid length                
                let checktype = checkType(str, options.type, options.case);                    
                if(checktype === 'true') {
                    // a valid type
                    return {status: true};
                } else {
                    return {status: false, message: checktype};
                }             
                
            } else {
                return {status: false, message: checkLen};
            }            
            
        }        
        
    
    }
}

// check if options present and validate it

/**
 * 
 * @param {*} opt 
 * 
 * {
 *      len: length of the password,
 *      type: number, alpha or alphanumeric,
 *      case: true or false for special characters should present,      
 *      
 * }
*/

let validateOptions = opt => {

    //  check if the object is present or not
    
    if(opt !== undefined && opt !== '' && opt !== null) {

        //  check if type of object

        if(typeof opt === "object") {
            
            // check options contains length parameter

            if(opt.len !== null && opt.len !== '' && opt.len !== undefined && typeof opt.len === "number") {

                // options length parameter is present

                // check options contains type parameter

                if(opt.type !== null && opt.type !== '' && opt.type !== undefined) {

                    // options type parameter is present

                    if(vHelper('type', opt.type)) {
                        return 'true';
                    }

                    // check options contains case parameter

                    if(opt.case !== null && opt.case !== '' && opt.case !== undefined) {

                        // options case parameter is present
                        
                        if(vHelper('case', opt.case)) {
                            return 'true';
                        }                       

                    } else {

                        // options case parameter not present

                        vHelper('case', opt.case);
                    }

                } else {

                    // options type parameter not present

                    vHelper('type', opt.type);
                }

            } else {

                // options length parameter not present

                vHelper('len', opt.len);
                
            }   

        } else {

            throw new Error('options specified is not type of object');
        }

    } else {
        
        // no options specified
        return false;
    }    

}

// validation type helper

let vHelper = (title, str) => {

    // check for null
    if(str === null) {
        throw new Error(`Options property ${title} cannot be null`);
    } 
    else if(str === undefined) {
        throw new Error(`Options property ${title} is undefined`);
    } 
    else if(str === '') {
        throw new Error(`Options property ${title} cannot be empty`);
    } 
    else if(typeof str !== Number && title === 'len') {
        throw new Error(`Options property ${title} is not type number`);
    }
    
    if(title === 'type') {
        
        // check for valid values

        if(str !== 'alpha' && str !== 'alphanumeric' && str !== 'numeric') {
            throw new Error(`Options property ${title} specified is not a valid type`);
        } else {
            return true;
        }

    }

    if(title === 'case') {

        // check for valid type

        if(typeof str !== "boolean") {
            throw new Error(`Options property ${title} specified is not a valid type`);
        } else {
            return true;
        }
    }

}

// check the length of password

let checkLength = (str, len) => {

    if(str.length > 0) {

        // had a valid length        
        if(str.length >= len) {

            // has a valid given length
            return 'true';

        } else {
            // the given lenght is not matched
            return `Options property len should have atleast ${len} characters`;
        }

    } else {
        // the given length is empty
        throw new Error('Options property len cannot be empty');
    }
}

// check the type of the string

let checkType = (str, type, casetype) => {

    switch(type) {

        case 'alpha':          if(casetype) {

                                    let desired = str.replace(/[^\w\s]/gi, '');

                                    if(/^[A-Za-z]+$/i.test(desired)) {
                                        // valid type of alpha
                                        return 'true';                                    
                                    } else {
                                        // not valid alpha                                    
                                        
                                            return 'Password should contain only alphabets';                                    
                                        
                                    }

                                }
                                else {
                                    if(/^[A-Za-z]+$/i.test(str)) {
                                        // valid type of alpha
                                        return 'true';                                    
                                    } else {
                                        // not valid alpha                                    
                                        
                                            return 'Password should contain only alphabets';                                    
                                        
                                    }
                                }                                
                                break;


        case 'numeric':         if(casetype) {

                                    let desired = str.replace(/[^\w\s]/gi, '');

                                    if(/^\d+$/i.test(desired)) {
                                        //valid type of numeric                                    
                                        return 'true';
                                    } else {
                                        // not a valid numeric
                                        return 'Password should contain only numbers';                                    
                                    }

                                } else {

                                    if(/^\d+$/i.test(str)) {
                                        //valid type of numeric                                    
                                        return 'true';
                                    } else {
                                        // not a valid numeric
                                        return 'Password should contain only numbers';                                    
                                    }

                                }                                
                                break;

        case 'alphanumeric':    if(casetype) {

                                    let desired = str.replace(/[^\w\s]/gi, '');

                                    if(/^([a-zA-Z_]{1,}\d{1,})+|(\d{1,}[a-zA-Z_]{1,})+$/.test(desired)) {
                                        // a valid type for numeric
                                        return 'true';     
                                    } else {
                                        // not a valid type for numeric
                                        return 'Password should contain both alphabets and numbers';                                          
                                    }
                                }
                                else {
                                    if(/^([a-zA-Z_]{1,}\d{1,})+|(\d{1,}[a-zA-Z_]{1,})+$/.test(str)) {
                                        // a valid type for numeric
                                        return 'true';     
                                    } else {
                                        // not a valid type for numeric
                                        return 'Password should contain both alphabets and numbers';                                          
                                    }
                                }
                                
                                break;
    
        default: throw new Error('Options do not contain a valid type');
    }                                    
                
}

// check the case of string

let checkCase = str => {

    // check string contains special characters
    if(str.match(/(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/)) {
        // special characters found
        return 'true';
    } else {
        // no special characters found        
        return 'Password should contain atleast one special character';
    }
}

module.exports = {
    check,
    vHelper
}