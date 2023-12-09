// userController.js
const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
// Get user by Id
exports.getUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.find({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by Name
exports.getUserByName = async (req, res) => {
    const userName = req.params.userName;

    try {
        const user = await User.find({ name: userName });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by Name
exports.getUserByAge = async (req, res) => {
    const userAge = req.params.userAge;

    try {
        const user = await User.find({ age: userAge });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user

exports.createUser = async (req, res) => {
    try {
    
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID

exports.deletedUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await User.findOneAndDelete({ id: userId });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user by name

exports.deletedUserByName = async (req, res) => {
    const userName = req.params.userName;

    try {
        const deletedUser = await User.findOneAndDelete({ name: userName });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user by age

exports.deletedUserByAge = async (req, res) => {
    const userAge = req.params.userAge;

    try {
        const deletedUser = await User.findOneAndDelete({ age: userAge });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user by ID

exports.updatedUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the existing user by ID and update with the new data
        const updatedUser = await User.findOneAndUpdate(
            { id: userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Update user by name

exports.updatedUserByName = async (req, res) => {
    const userName = req.params.userName;

    try {
        // Find the existing user by name
        const existingUser = await User.findOneAndUpdate(
            { name: userName },
            req.body,
            { new: true, runValidators: true }
        );

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if request body is empty or undefined
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is empty or missing required fields' });
        }

        // Update the existing user with the new data
        Object.assign(existingUser, req.body);

        // Save the updated user to the database
        const updatedUser = await existingUser.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Update user by age

exports.updatedUserByAge = async (req, res) => {
    const userAge = req.params.userAge;

    try {
        // Find the existing user by name
        const existingUser = await User.findOneAndUpdate(
            { age: userAge },
            req.body,
            { new: true, runValidators: true }
        );

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if request body is empty or undefined
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is empty or missing required fields' });
        }

        // Update the existing user with the new data
        Object.assign(existingUser, req.body);

        // Save the updated user to the database
        const updatedUser = await existingUser.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};