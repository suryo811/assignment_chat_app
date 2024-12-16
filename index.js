import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import { createServer } from "http";
import { Server } from "socket.io";
import connectDb from './db.js';
import globalErrorHandler from './middleware/errorHandler.js';
import AppError from './utils/appError.js';
import authRoute from './routes/authRoute.js'
import socketController from './controller/socketController.js';

const app = express()

app.use(express.json());

//route handlers
app.use("/api/v1/auth", authRoute);





app.all("*", (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);


const PORT = process.env.PORT || 3001

// Create HTTP server and initialize Socket.io
const server = createServer(app);
const io = new Server(server);

// Pass the Socket.io instance to the controller
socketController(io);


// Start the server
const startServer = async () => {
    try {
        await connectDb();
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error.message);
        process.exit(1); //unsuccessful exit
    }
};

startServer();
