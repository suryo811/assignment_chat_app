import authenticateSocket from '../middleware/socketAuthMiddleware.js'

const socketController = (io) => {

    io.use(authenticateSocket);  // This will be applied to all incoming socket connections

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.username}`);

        // Event to handle sending messages
        socket.on('send-message', (message) => {
            if (!socket.user) {
                console.log('Unauthorized user attempted to send a message');
                return;
            }

            console.log(`Message from ${socket.user.username}: ${message}`);
            // Broadcast the message to all connected clients
            io.emit('new-message', { user: socket.user.username, message });
        });

        // Event for disconnecting
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.username}`);
        });
    });
};

export default socketController;


















// // socketController.js
// import authenticateSocket from '../middleware/socketAuthMiddleware.js'

// const socketController = (io) => {
//     // Apply the middleware to verify user on connection
//     io.use(authenticateSocket);  // This will be applied to all incoming socket connections

//     io.on('connection', (socket) => {
//         console.log(`User connected: ${socket.user.username}`);

//         // Event to handle sending messages
//         socket.on('send-message', (room, message) => {
//             if (!socket.user) {
//                 console.log('Unauthorized user attempted to send a message');
//                 return;
//             }

//             console.log(`Message from ${socket.user.username}: ${message}`);
//             io.to(room).emit('new-message', { user: socket.user.username, message });
//         });

//         // Event to handle joining rooms
//         socket.on('join-room', (room) => {
//             console.log(`User ${socket.user.username} joined room: ${room}`);
//             socket.join(room);
//             socket.emit('message', `Welcome to room ${room}`);
//         });

//         // Event for disconnecting
//         socket.on('disconnect', () => {
//             console.log(`User disconnected: ${socket.user.username}`);
//         });
//     });
// };

// export default socketController;






// import Message from "../models/messageModel.js"; // Import Message model

// const socketController = (io) => {
//     io.on("connection", (socket) => {
//         console.log("A user connected");

//         // Listen for 'send-message' event
//         socket.on("send-message", async (messageData) => {
//             try {
//                 const { userId, message } = messageData;

//                 // Store the message in the database
//                 const newMessage = new Message({
//                     userId,
//                     message
//                 });

//                 await newMessage.save(); // Save the message in the DB
//                 console.log("Message saved to database:", newMessage);

//                 // Broadcast the message to all connected clients
//                 io.emit("new-message", newMessage); // Broadcast to everyone

//             } catch (error) {
//                 console.error("Error storing message:", error);
//             }
//         });

//         // Handle user disconnect
//         socket.on("disconnect", () => {
//             console.log("A user disconnected");
//         });
//     });
// };

// export default socketController;
