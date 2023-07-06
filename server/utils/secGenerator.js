const crypt = require('crypto');

const sec = crypt.randomBytes(64).toString('hex');