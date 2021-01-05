const expres = require('express');
const mongoose = require('mongoose');
const {validSchema} = require('../models/Accessory');

const Accessory = mongoose.model("Accessory");
const router = expres.Router();

router.get('/accessories',async(req,res)=>{
    const accessories = await Accessory.find().populate("items");
    res.send(accessories);
});

router.get('/accessories:id',async(req,res)=>{
    const accessory = await Accessory.find({_id:req.params.id}).populate("items");
    res.send(accessory);
});

router.post('/accessories',async(req,res)=>{
    const {error} =  validSchema.validate(req.body);
    console.log(error)
    if(error) return res.status(409).send("ivalid request body");
    try{
        const accessorie = new Accessory(req.body);
        const response = await accessorie.save();
        res.status(200).send("ok");
    }catch(err){
        res.status(422).send("error");
    }
});

router.put('/accessories:id',async(req,res)=>{
    const {error} = validSchema.validate(req.body);
    if(error) return res.status(409).send("invalid request body");
    try{
        const accessorie = await Accessory.findOneAndUpdate(req.params.id,req.body);
        if(accessorie===null) return res.status(404).send("not found");
        res.status(200).send("ok");
    }catch(err){
        res.status(422).send("error")
    }
});

router.delete('/accessories:id',async(req,res)=>{
    const accessory = Accessory.findByIdAndDelete(req.params.id);
    if(Accessory === null) return res.status(404).send("Not found");
    res.status(200).send("ok");
});

module.exports = router;