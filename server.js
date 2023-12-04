const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./userModel');

app.use(express.json());

// Get all customers


app.get('/customers', async (req, res) => {
    try {
        const customers = await User.find({});
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get customer by ID


app.get('/customers/id/:customerId', async (req, res) => {
    const customerId = req.params.customerId;

    console.log(customerId)
    try {
        const customer = await User.find({ id: customerId });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get customer by name


app.get('/customers/name/:customerName', async (req, res) => {
    const customerName = req.params.customerName;

    console.log(customerName)
    try {
        const customers = await User.find({ name: customerName });
        if (customers.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get customer by age


app.get('/customers/age/:customerAge', async (req, res) => {
    const customerAge = req.params.customerAge;

    console.log(customerAge)
    try {
        const customers = await User.find({ age: customerAge });
        if (customers.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create a new customer


app.post('/customers', async (req, res) => {
    try {
        const customer = await User.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Delete customer by ID


app.delete('/customers/dlt-id/:customerId', async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const deletedCustomer = await User.findOneAndDelete({ id: customerId });

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete customer by name


app.delete('/customers/dlt-name/:customerName', async (req, res) => {
    const customerName = req.params.customerName;

    try {
        const deletedCustomer = await Customer.findOneAndDelete({ name: customerName });

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete customer by age


app.delete('/customers/dlt-age/:customerAge', async (req, res) => {
    const customerAge = req.params.customerAge;

    try {
        const deletedCustomer = await Customer.findOneAndDelete({ age: customerAge });

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update customer by ID


app.put('/customers/up-id/:customerId', async (req, res) => {
    const customerId = req.params.customerId;

    try {
        // Find the existing customer by ID
        const existingCustomer = await Customer.findOne({ id: customerId });

        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update the existing customer with the new data
        Object.assign(existingCustomer, req.body);

        // Save the updated customer to the database
        const updatedCustomer = await existingCustomer.save();

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
});


// Update customer by name


app.put('/customers/up-name/:customerName', async (req, res) => {
    const customerName = req.params.customerName;

    try {
        // Find the existing customer by ID
        const existingCustomer = await Customer.findOne({ name: customerName });

        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update the existing customer with the new data
        Object.assign(existingCustomer, req.body);

        // Save the updated customer to the database
        const updatedCustomer = await existingCustomer.save();

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
});



// Update customer by age


app.put('/customers/age/:customerAge', async (req, res) => {
    const customerAge = req.params.customerAge;

    try {
        // Find the existing customer by age
        const existingCustomer = await Customer.findOne({ age: customerAge });

        if (!existingCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update the existing customer with the new data
        Object.assign(existingCustomer, req.body);

        // Save the updated customer to the database
        const updatedCustomer = await existingCustomer.save();

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
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
