const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./userModel');
const bcrypt = require('bcrypt');

app.use(express.json());


// Get all users


app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user by ID


app.get('/users/id/:userId', async (req, res) => {
    const userId = req.params.userId;

    console.log(userId)
    try {
        const user = await User.find({ id: userId });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 
//get user by name


app.get('/users/name/:userName', async (req, res) => {
    const userName = req.params.userName;

    console.log(userName)
    try {
        const users = await User.find({ name: userName });
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get user by age


app.get('/users/age/:userAge', async (req, res) => {
    const userAge = req.params.userAge;

    console.log(userAge)
    try {
        const users = await User.find({ age: userAge });
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create a new user


app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});
 
// Delete user by ID


app.delete('/users/id/:userId', async (req, res) => {
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
});


// Delete user by name


app.delete('/users/name/:userName', async (req, res) => {
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
});

// Delete user by age


app.delete('/users/age/:userAge', async (req, res) => {
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
});


// Update user by ID


app.put('/users/id/:userId', async (req, res) => {
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
});



// Update user by name
 

app.put('/users/name/:userName', async (req, res) => {
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
});



// Update user by age

app.put('/users/age/:userAge', async (req, res) => {
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
});


  // Login endpoint

 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // Check if the passwords match
        if (!isPasswordMatch) {
            console.log('Passwords do not match');
            return res.status(401).json({ message: 'Invalid email or password' });
        }
 
        // Passwords match, respond with a success message
      //  console.log('Login successful');
        res.status(200).json({ message: '✌️👏Login successful👏✌️' });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Internal server error' });
    }
});



// MongoDB connection


mongoose
    .connect('mongodb+srv://naveed65dev:red.78665@cluster0.gr533qq.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');

        // Server is running after MongoDB connection

        app.listen(65, () => {
            console.log('Server is running on port 65');
        });
    })
    .catch((error) => {
        console.error(error);
    });
