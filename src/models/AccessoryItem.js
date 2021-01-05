const mongoose = require('mongoose');
const Joi = require('joi');

const accessorieItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    urlImage:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        default:0
    },
})

const validSchema =   Joi.object({
    name:Joi.string()
    .required(),
    urlImage:Joi.string()
    .allow(null,""),
    price:Joi.number(),
    _id:Joi.string()
    .allow(null,'')
})

module.exports.validSchema = validSchema; 
module.exports.accessorieItemSchema = accessorieItemSchema;
mongoose.model('AccessoryItem', accessorieItemSchema);