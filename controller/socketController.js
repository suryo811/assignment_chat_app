import authenticateSocket from '../middleware/socketAuthMiddleware.js';
import Message from '../models/messageModel.js';
import applyRateLimit from '../utils/redisRateLimit.js'

const socketController = (io) => {
    // Apply authentication middleware
    io.use(authenticateSocket);

    io.on('connection', (socket) => {
        // Automatically join room1
        socket.join('room1');
        console.log(`User connected to room1: ${socket.user.username}`);

        // Handle sending messages
        socket.on('send-message', async (message) => {
            // Validate user authentication
            if (!socket.user) {
                console.log('Unauthorized user attempted to send a message');
                return;
            }

            try {
                // Create and save message to database
                const newMessage = new Message({
                    username: socket.user.username,
                    message: message,
                    room: 'room1'
                });
                await newMessage.save();

                console.log(`Message saved from ${socket.user.username}: ${message}`);

                // Broadcast the message to room1
                io.to('room1').emit('new-message', {
                    user: newMessage.username,
                    message: newMessage.message,
                    createdAt: newMessage.createdAt
                });
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected from room1: ${socket.user.username}`);
        });
    });
};

export default socketController;