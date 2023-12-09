// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Log stored and provided passwords for debugging
        console.log('Stored Password:', user.password);
        console.log('Provided Password:', password);

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // Log the result of password comparison for debugging
        console.log('Password Match Result:', isPasswordMatch);

        // Check if the passwords match
        if (!isPasswordMatch) {
            console.log('Passwords do not match');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Passwords match, generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            '123',   // Replace with a secure secret key
            { expiresIn: '1h' }
        );

        // Passwords match, respond with a success message
        res.status(200).json({ message: '👏✌️Login successful👏✌️', token });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Internal server error' });
    }
};




// Middleware to verify JWT

const authenticateToken = (req, res) => {
    const tokenWithBearer = req.header('Authorization');

    // Check if the token starts with "Bearer " and remove it
    const token = tokenWithBearer.startsWith('Bearer ') ? tokenWithBearer.slice(7) : tokenWithBearer;

    // Log the token for debugging
    console.log('Received Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    } else {
        jwt.verify(token, '123', (err, user) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.user = user;
            res.status(200).json({ message: 'Access granted', user: req.user });
        });
    }


}





// Example of a protected route using the middleware
exports.checkToken = async (req, res) => {
    await authenticateToken(req, res)
    // Access the authenticated user's information through req.user

};

