const jwt = require('jsonwebtoken');
require('dotenv').config();

const accessJwtGenerator = (name, email) => {
    const payload = {
        name,
        email
    }

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10m'});

    return accessToken

}

module.exports = accessJwtGenerator