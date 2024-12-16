import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import { generateAccessToken } from '../utils/jwt.js'

const register = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    const usernameAlreadyExists = await User.findOne({ username })
    if (usernameAlreadyExists) {
        throw new AppError('Username already exists', 400);
    }

    const user = await User.create({ username, password })

    const tokenUser = { name: user.username, userId: user._id }

    //generate token
    const accessToken = generateAccessToken(tokenUser)

    res.status(201).json({
        user: tokenUser,
        accessToken,
    })

})

export { register }

