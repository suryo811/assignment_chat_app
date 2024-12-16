import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);
export default Message;