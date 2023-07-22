const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshJwtGenerator = (name, email) => {
    const payload = {
        name,
        email
    }

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return refreshToken

}

module.exports = refreshJwtGenerator