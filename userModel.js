 
const mongoose = require ('mongoose');
const userModel = mongoose.Schema({
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


const user = mongoose.model('user',userModel);
module.exports = user;
