const mongoose = require('mongoose');
const Joi = require('Joi')

const accessorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isMultiple:{
        type:Boolean
    },
    hasImage:{
        type:Boolean
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AccessoryItem'
    }]
});

const validSchema = Joi.object({
    title:Joi.string()
    .required()
    .max(40),
    isMultiple:Joi.bool()
    .required(),
    items:Joi.array()
    .required(),
    hasImage:Joi.bool()
});
module.exports.validSchema = validSchema;
module.exports.accessorySchema = accessorySchema;
mongoose.model('Accessory',accessorySchema);