import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js'

const authenticateSocket = (socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
        next(new AppError('Authentication token is missing!', 401));
    }

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        socket.user = decoded // Attach user info to socket object
        next();
    } catch (error) {
        next(new AppError('Invalid or expired token!', 401));
    }
};

export default authenticateSocket;
