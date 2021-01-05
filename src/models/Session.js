const mongoose = require('mongoose');
const Joi = require('Joi');

const sessionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        max:50
    },
    detail:{
        type:String,
        max:350
    },
    price:{
        type:Number,
        required:true
    },
    locationType:{
        type:String,
        enum:['Estudio','Exterior'],
        required:true
    },
    sessionType:{
        type:String,
        max:50
    },
    urlImage:{
        type:String,
        max:150
    },
    accessories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Accessory'
    }]
 });

mongoose.model('Session', sessionSchema);