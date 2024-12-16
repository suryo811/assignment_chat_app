import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },

    username: {
        type: String,
    },

    room: {
        type: String,
        default: 'room1'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Message = mongoose.model('Message', messageSchema);
export default Message;