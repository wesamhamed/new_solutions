require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * generate a jwt token
 * @param {Object} payload - data to include in the token payload
 * @param {string} secret - secret key to sign the token
 * @param {string|number} expiresIn - token expiration
 * @returns {string} token
 */
const generateToken = (payload, secret, expiresIn) => {
    const options = {
        algorithm: 'HS256',
    };
    if (expiresIn) options.expiresIn = expiresIn;
    return jwt.sign(payload, secret, options);
};

/**
 * verify a jwt token
 * @param {string} token - token string
 * @param {string} secret - secret key to verify the token
 * @returns {string|object} payload
 */
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret, {
        algorithms: ['HS256'],
    });
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
};