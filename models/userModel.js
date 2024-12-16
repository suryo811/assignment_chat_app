import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
    },

}, {
    timestamps: true
});


//pre hook for bcrypt
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

//instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


const User = mongoose.model("User", userSchema);
export default User;