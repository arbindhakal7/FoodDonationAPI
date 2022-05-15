const validator = require('validator');

const RegisterInput = (data) => { //data is arguement!!
    let errors = {};
    if (data.fullname) {
        if (!validator.isLength(data.fullname.trim(), {min:5, max: 30})) { //trim() is used to remove white space from both ends and not from between two words. !!!!
            errors.fullname = 'Full Name must be in 5 to 30 chacraters.'
        }
    } else errors.fullname = 'Full Name is required';

    if (data.password) {
        if ((!validator.isLength(data.password.trim(), {min:5, max: 30}))) 
            errors.fullname = 'Password must be in 5 to 30 chacraters.'
    } else errors.password = 'Password is required';
    
    if (data.phone) {
        if (!validator.isLength(data.phone.trim(), { min: 10, max: 10 })) {
            errors.phone = 'phone must be only 10 digits'
        }
    } else errors.phone = 'phone is required';

    if (data.email) {
        if (!validator.isLength(data.email.trim(), { min: 10, max: 50 })) {
            errors.email = 'Email must be between 10 and 50 characters'
        }
    } else errors.email = 'Email is required';


    return { 
        errors,
        isvalid: Object.keys(errors).length === 0
    }
}
module.exports = {
    RegisterInput
};