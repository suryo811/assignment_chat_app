import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './db.js';
import globalErrorHandler from './middleware/errorHandler.js';
import AppError from './utils/appError.js';
import authRoute from './routes/authRoute.js'

const app = express()

app.use(express.json());

//route handlers
app.use("/api/v1/auth", authRoute);





app.all("*", (req, _) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
});
app.use(globalErrorHandler);


const port = process.env.PORT || 3001
const start = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1); //unsuccessful exit
    }
}

start()