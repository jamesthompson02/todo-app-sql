
const validateCredentials = (req, res, next) => {

    const { name, email, password } = req.body;

    const isValidName = nameValidation(name);

    if (!isValidName) {
       return res.status(401).send('Invalid credentials');
    }

    const isValidEmail = emailValidation(email);

    if (!isValidEmail) {
        return res.status(401).send('Invalid credentials');
    }

    const isValidPassword = passwordValidation(password);

    if (!isValidPassword) {
        return res.status(401).send('Invalid credentials');
    }

    next();
}

const emailValidation = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    return emailRegex.test(email);
}

const nameValidation = (name) => {
    const nameRegex = /^[a-zA-Z '-]+$/ 
    const spaceRegex = /\ /
    const capitalRegex = /[A-Z]/

    if (!name) {
        return false
    }

    const noInvalidCharacters = nameRegex.test(name);

    if (!noInvalidCharacters) {
        return false
    }

    const containsSpace = spaceRegex.test(name);

    if (!containsSpace) {
        return false
    }

    const splitName = name.split(' ');
    const validName = splitName.filter((eachName) => eachName !== '').filter((eachName) => capitalRegex.test(eachName[0]));

    if (validName.length < 2) {
        return false
    }

    return true
}

const passwordValidation = (password) => {
    const capitalRegex = /[A-Z]/
    const lowerCaseRegex = /[a-z]/
    const specialCharacterRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const numberRegex = /[0-9]/

    if (!capitalRegex.test(password)) {
        return false
    }

    if (!lowerCaseRegex.test(password)) {
        return false
    }

    if (!specialCharacterRegex.test(password)) {
        return false
    }

    if (!numberRegex.test(password)) {
        return false
    }
    if (password.length < 8) {
        return false
    }

    return true
}

module.exports = { validateCredentials }


