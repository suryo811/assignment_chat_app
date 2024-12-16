import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDb from './db.js';

const app = express()

app.use(express.json());











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