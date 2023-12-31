require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./api/routes/userRoute')
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 65;

app.use(express.json());

  //api
  
app.use('/api',userRoute);


   // MongoDB connection

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');

        // Server is running after MongoDB connection

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
          
    })
    .catch((error) => {
        console.error(error);
    });
