const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Product = mongoose.model('Product');
const router = express.Router();

router.get('/products', async(req,res)=>{
    const {location} = req.query;
    try{
        const response  = await Product.find({location});
        res.status(200).send(response);
    }catch(err){
        res.status(500).send(err.message);
    }  
   
});

router.post('/products',async(req, res)=>{
    const {title, detail, price, location} = req.body;
    try{
        const product = new Product({title, detail, price,location});
        const response = await product.save();
        res.status(201).send("Registro guardado")
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;


 