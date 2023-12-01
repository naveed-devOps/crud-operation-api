 
const mongoose = require ('mongoose');
const customerModel = mongoose.Schema({
    name: {
        type: String,
        require:[true,"please enter your name"]
    },
    age: {
        type:Number,
        require:[true, "please enter your age"]

    },
    id: {
        type:Number,
        require:[true,"please enter your id"]
    }

})


const customer = mongoose.model('customer',customerModel);
module.exports = customer;
