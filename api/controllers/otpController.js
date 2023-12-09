// otpController.js
const User = require('../models/userModel');

// Reset password using OTP
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided OTP matches the stored OTP and has not expired
        if (user.resetToken !== otp || Date.now() > user.resetTokenExpiration) {
            return res.status(401).json({ message: 'Invalid or expired OTP' });
        }

        // Update the user's password (replace with MongoDB update)
        user.password = newPassword;

        // Clear the OTP and expiration after successful password reset
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Other OTP-related functions...
