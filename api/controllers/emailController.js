// emailController.js
const nodemailer = require('nodemailer');
const User = require('../models/userModel');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 25,
    secure: false,
    auth: {
      user: 'naveed65dev@gmail.com',
      pass: 'fxpm tzje yomq mffa',
    },
  });


 // Function to generate a random OTP
 function generateOTP() {
    const length = 6;
    const characters = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += characters[Math.floor(Math.random() * characters.length)];
    }
    return OTP;
}

// Generate and send OTP to user's email
exports.generateOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate OTP
        const otp = generateOTP();
        // Store OTP and its expiration time in the user document
        user.resetToken = otp;
        user.resetTokenExpiration = Date.now() + 600000; // OTP expires in 10 minutes
        await user.save();
        // Log the generated OTP (for debugging purposes)
        console.log('Generated OTP:', otp);
        // Send OTP to user's email
        const mailOptions = {
            from: 'naveed65dev@gmail.com',
            to: email,
            subject: 'Reset Password OTP',
            text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                
                res.status(500).json({ message: 'Error sending OTP email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'OTP sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Other email-related functions...
