const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword
}