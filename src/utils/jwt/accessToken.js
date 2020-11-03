/////////////////////////////////////////////////////////////////////////
require('dotenv').config();
const { generateToken, verifyToken, decodeToken } = require('./general');

/**
 * generate and verify access tokens with a their own secret key
 */
const accessToken = {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
    generate(payload) {
        return generateToken(payload, this.secret, this.expiresIn);
    },
    verify(token) {
        return verifyToken(token, this.secret);
    },
    decode(token) {
        return decodeToken(token);
    },
};

module.exports = accessToken;