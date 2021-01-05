const mongoose = require('mongoose');
const Joi = require('joi')
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    },
    birthday:{
        type:Date,
    },
    instagram:{
        type:String
    }
});

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password,saltRounds,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
})

userSchema.methods.comparePassword= async function(passwordInserted){
    const match = await bcrypt.compare(passwordInserted,this.password);
    return match;
    
}

const validSchema = Joi.object({
    fullName:Joi.string()
    .alphanum()
    .min(3)
    .max(40),
    email: Joi.string()
    .min(5)
    .max(254)
    .required(),
    password:Joi.string()
    .required()
    .min(8)
    .max(254),
    whatsapp:Joi.string()
    .max(15),
    instagram:Joi.string()
    .max(30),
    birthday:Joi.date()
});

module.exports.validSchema = validSchema;
mongoose.model('User',userSchema);

 