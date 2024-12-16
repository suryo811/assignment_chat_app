import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import { generateAccessToken } from '../utils/jwt.js'

const register = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        throw new AppError('please provide username and password', 400)
    }

    const usernameAlreadyExists = await User.findOne({ username })
    if (usernameAlreadyExists) {
        throw new AppError('Username already exists', 400);
    }

    const user = await User.create({ username, password });

    const tokenUser = { name: user.username, userId: user._id }

    res.status(201).json({
        user: tokenUser
    })

})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new AppError('please provide username and password', 400)
    }

    const user = await User.findOne({ username })
    if (!user) {
        throw new AppError('invalid credentials', 401)
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new AppError('invalid credentials', 401)
    }

    const tokenUser = { name: user.username, userId: user._id }
    //generate token
    const accessToken = generateAccessToken(tokenUser)

    res.status(200).json({
        user: tokenUser,
        accessToken
    })
})

export { register, login }

