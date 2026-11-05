import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'User name is required'],
        trim: true,
        minlength: [3, 'User name cannot be less than 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password cannot be less than 6 characters'],
    }
}, { timestamps: true });


// HASH PASSWORD
UserSchema.pre('save', async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


// COMPARE PASSWORD ON LOGIN
UserSchema.methods.comparePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
};




const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;