const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (name, email) => {
    const payload = {
        name,
        email
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600})

}

module.exports = jwtGenerator