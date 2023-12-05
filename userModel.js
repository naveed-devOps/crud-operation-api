const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"]
    },
    age: {
        type: Number,
        required: [true, "please enter your age"]
    },
    id: {
        type: Number,
        required: [true, "please enter your id"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true, // Ensure the email is unique in the database
        validate: {
            validator: function (value) {
                // Validate email format using a simple regular expression
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
                // Ensure the password meets the specified requirements
                // At least one symbol, one uppercase letter, one number, and a minimum length of 8 characters
                const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
                return passwordRegex.test(value);
            },
            message: props => `${props.value} does not meet the password requirements!`
        }
    }
});

// Hash the password before saving to the database
userModel.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        // Ensure the password starts with #
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

const User = mongoose.model('user', userModel);
module.exports = User;
