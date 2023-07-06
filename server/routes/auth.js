const router = require('express').Router();
const User = require('../models/user');
const jwtGenerator = require('../utils/jwtCreator');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkForEmail = await User.checkForExistingUser(email);

        if (checkForEmail) {
            res.status(409).send('This email is already linked to an account.')
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

router.post('/login', (req, res) => {
    res.send('Testing login')
})

module.exports = router