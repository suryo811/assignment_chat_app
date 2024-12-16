import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/messageModel.js";
import AppError from "../utils/appError.js";

// get last 20 messages
// latest first
const getRecentMessages = asyncHandler(async (req, res, next) => {
    const messages = await Message.find({ room: 'room1' })
        .sort({ createdAt: -1 }) // Sort by most recent first
        .limit(20) // Limit to 20 messages
        .select('username message createdAt') // Select specific fields
        .exec();

    if (!messages) {
        throw new AppError('Error fetching messages', 500)
    }

    res.status(200).json({
        success: true,
        count: messages.length,
        messages
    });
})

export { getRecentMessages }