const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const emailController = require('../controllers/emailController');
const otpController = require('../controllers/otpController');

// Routes for userController
router.get('/users', userController.getAllUsers);
router.get('/users/id/:userId', userController.getUserById);
router.get('/users/name/:userName', userController.getUserByName);
router.get('/users/age/:userAge', userController.getUserByAge);
// Routes for create a user
router.post('/users', userController.createUser);
// Routes for delete a user
router.delete('/users/id/:userId', userController.deletedUserById);
router.delete('/users/name/:userName', userController.deletedUserByName);
router.delete('/users/age/:userAge', userController.deletedUserByAge);
// Routes for update a user
router.put('/users/id/:userId', userController.updatedUserById);
router.put('/users/name/:userName', userController.updatedUserByName);
router.put('/users/age/:userAge', userController.updatedUserByAge);




// Routes for emailController
router.post('/generate-otp', emailController.generateOTP);


// Routes for otpController
router.post('/reset-password', otpController.resetPassword);
// Other OTP-related routes...

// Routes for authController
router.post('/login', authController.login);

router.get('/protected-route', authController.checkToken);


module.exports = router;
