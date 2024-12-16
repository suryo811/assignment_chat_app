import jwt from 'jsonwebtoken';

const generateAccessToken = (userObj) => {
    return jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP });
}

export { generateAccessToken }