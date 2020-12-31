const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String
    },
    detail:{
        type:String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    } 
 

});

mongoose.model('Product', productSchema);