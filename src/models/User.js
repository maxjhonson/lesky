const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    whatsapp:{
        type:String,
        required:true
    },
    birthday:{
        type:Date,
        required:true
    },
    instagram:{
        type:String
    }
});

mongoose.model('User',userSchema);

 