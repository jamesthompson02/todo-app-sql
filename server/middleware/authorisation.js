const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const authoriseAccess = async (req, res, next) => {
    try {

        const jwtToken = req.header('token');

        if (!jwtToken) {
            return res.status(403).send('Not authorised.')
        }

        const payload = jsonwebtoken.verify(jwtToken, process.env.JWT_SECRET);

        console.log(payload);

        req.name = payload.name;
        req.email = payload.email;

        next();

    } catch(err) {
        res.status(403).send(err.message);
    }
}

module.exports = { authoriseAccess };