const authRouter = require('express').Router();
const User = require('../models/user');
const accessJwtGenerator = require('../utils/accessJwtCreator');
const { validateCredentials } = require('../middleware/validSignUpInfo');
const { authoriseAccess } = require('../middleware/authorisation');
const refreshJwtGenerator = require('../utils/refreshJwtGenerator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

authRouter.post('/register', validateCredentials, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkForEmail = await User.checkForExistingUser(email);

        if (checkForEmail.length) {
            return res.status(409).send('This email is already linked to an account.')
        }

        const createNewUser = await User.createNewUser(name, email, password);

        if (createNewUser === 'New User Created.') {

            const accessToken = accessJwtGenerator(name, email);

            const refreshToken = refreshJwtGenerator(name, email);

            res.cookie('TODO_JWT_REFRESH_TOKEN', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 30 * 24 * 60 * 60 * 1000
    
            });

            res.status(201).json({name, email, accessToken});
        } else {
            res.status(500).send('Error - failed to create new account');
        }        
    } catch(err) {
        res.status(500).send(err.message);
    }
    
})

authRouter.post('/login', async (req, res) => {

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

        const accessToken = accessJwtGenerator(user[0].name_of_user, email);

        const refreshToken = refreshJwtGenerator(user[0].name_of_user, email);

        res.cookie('TODO_JWT_REFRESH_TOKEN', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000

        });

        return res.status(200).json({ 
            name: user[0].name_of_user,
            email,
            accessToken
        });

    } catch(err) {
        res.status(500).send(err.message);

    }
})

authRouter.get('/refresh', (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies.TODO_JWT_REFRESH_TOKEN) {
            return res.status(401).send("Unauthorized");
        };

        const refreshToken = cookies.TODO_JWT_REFRESH_TOKEN;

        const { name, email } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const checkForEmail = await User.checkForExistingUser(email);

        if (!checkForEmail.length) {
            return res.status(401).send("Unauthorized");
        }

        const accessToken = accessJwtGenerator(name, email);

        return res.json({name, email, accessToken});
    } catch(err) {
        return res.status(500).send(err.message);
    }
})

authRouter.get('/verification', authoriseAccess, async (req, res) => {
    try {
        res.json(true);

    } catch(err) {
        res.status(500).send(err.message);
    }
})

authRouter.post('/logout', (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.TODO_JWT_REFRESH_TOKEN) {
        return res.status(204).send('No content');
    }
    res.clearCookie('TODO_JWT_REFRESH_TOKEN', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000

    });
    res.json({message: 'Cookie cleared'});
})

module.exports = authRouter