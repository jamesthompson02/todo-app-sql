const userAccountRouter = require('express').Router();
const User = require('../models/user');
const { authoriseAccess } = require('../middleware/authorisation');

userAccountRouter.put('/update-username', authoriseAccess, async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedUsername = await User.updateUserName(name, email);

        res.status(204).send('Username updated successfully.');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

userAccountRouter.put('/update-email', authoriseAccess, async (req, res) => {
    try {
        const { newEmail, email } = req.body;

        const updatedEmail = await User.updateUserEmail(newEmail, email);

        res.status(204).send('Email updated successfully.');
        
    } catch(err) {
        res.status(500).send(err.message);
    }
});

userAccountRouter.put('/update-password', authoriseAccess, async (req, res) => {
    try {
        const { newPassword, email } = req.body;

        const updatedPassword = await User.updateUserPassword(newPassword, email);

        res.status(204).send('Password updated successfully.');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

userAccountRouter.delete('/delete', authoriseAccess, async (req, res) => {
    try {
        const { email } = req.body;
        
        const deletedUser = await User.deleteUser(email);

        res.status(204).send('User account deleted successfully.');
    } catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = userAccountRouter