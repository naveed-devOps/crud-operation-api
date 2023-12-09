const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    age: {
        type: Number,
        required: [true, "please enter your age"],
        unique: false,
    },
    id: {
        type: Number,
        unique: true,
        required: [true, "please enter your id"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[a-zA-Z0-9._-]+@[gmail]+\.[com]{2,6}$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        validate: {
            validator: function (value) {
                // Adjust the password complexity requirements as needed
                const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
                return passwordRegex.test(value);
            },
            message: props => `${props.value} does not meet the password requirements!`
        }
    },
    resetToken: String,
    resetTokenExpiration: Date,
});

// Hash the password before saving to the database
userModel.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Prefix the password with '#' if it doesn't start with it
        if (!this.password.startsWith('#')) {
            this.password = '#' + this.password;
        }

        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Generate a JWT token for authentication
userModel.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email },
        '123',   // Replace with a secure secret key
        { expiresIn: '1h' }
    );
    return token;
};

// Generate a reset token for password reset
userModel.methods.generateResetToken = function () {
    const resetToken = jwt.sign(
        { userId: this._id },
        '123', // Replace with a secure reset secret key
        { expiresIn: '1h' }
    );
    this.resetToken = resetToken;
    this.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    return resetToken;
};

const User = mongoose.model('user', userModel);
module.exports = User;
