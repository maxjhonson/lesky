const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {validSchema} = require('../models/AccessoryItem');

const AccessoryItem = mongoose.model('AccessoryItem');


router.get('/accessoryItems',async(req,res)=>{
    const response = await AccessoryItem.find();
    res.send(response);
})

router.post('/accessoryItems',async(req,res)=>{
    const {error} = validSchema.validate(req.body);
    if(error) return res.status(406).send("ivalid request body");
    try{
        const accessory = new AccessoryItem(req.body);
        const response =await  accessory.save();
        res.status(201).send({response:response});
    }catch(err){
        console.log(err)
        res.status(422).send("An error ocured trying to save");
    }
});

router.put('/accessoryItems', async(req,res)=>{
    const {error} = validSchema.validate(req.body);
    if(error) return res.status(406).send("invalid request body");
    try{
        const accessory = await AccessoryItem.findByIdAndUpdate({_id:req.body._id},req.body);
        if(accessory ===null) return res.status(404).send("Not found");
        res.status(200).send(accessory);
    }catch(err){
        res.status(422).send('An error ocured trying to update')
    }
})




module.exports = router;