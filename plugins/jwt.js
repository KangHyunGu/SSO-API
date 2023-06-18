const jwt = require('jsonwebtoken');
const config = require('../config').JWT;

// jwt 토큰 생성
const genToken = (user, expiresIn = '8h') => {
    const payload = {
        id : user.id
    }
    return jwt.sign(payload, config.SECRET, {...config.option, expiresIn})
}

const verify = (token) => {
    return jwt.verify(token, config.SECRET);
}

module.exports = {genToken, verify};