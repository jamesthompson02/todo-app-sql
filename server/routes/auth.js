const router = require('express').Router();
const User = require('../models/user');
const jwtGenerator = require('../utils/jwtCreator');
const { validateCredentials } = require('../middleware/validSignUpInfo');

router.post('/register', validateCredentials, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkForEmail = await User.checkForExistingUser(email);

        if (checkForEmail.length) {
            return res.status(409).send('This email is already linked to an account.')
        }

        const createNewUser = await User.createNewUser(name, email, password);

        if (createNewUser === 'New User Created.') {

            const token = jwtGenerator(name, email);

            res.status(201).json({token});
        } else {
            res.status(500).send('Error - failed to create new account');
        }        
    } catch(err) {
        res.status(500).send(err.message);
    }
    
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.checkForExistingUser(email);

        if (!user.length) {
            return res.status(401).send('Incorrect user credentials');
        }

        const checkedPassword = await User.checkPassword(password, user[0].user_password);

        if (!checkedPassword) {
            return res.status(401).send('Incorrect user credentials');
        }

        const token = jwtGenerator(user[0].name_of_user, email);

        return res.status(200).json({ token });

    } catch(err) {
        res.status(500).send(err.message);

    }
})

module.exports = router