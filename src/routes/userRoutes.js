const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const {validSchema} = require('../models/User');
const router = express.Router();
const secretWord = "SUPER_3.0_5.3";

router.post('/signup',async (req,res)=>{
    const {error} = validSchema.validate(req.body);
    if(error) return res.status(406).send("ivalid request body");
    try{
        const user = new User(req.body);
        const response = await user.save();
        const token =jwt.sign({userId: user._id},secretWord);
        res.status(201).send({user:response,token:token});
    }catch(err){
        console.log(err)
        if(err.code ===11000){
            res.status(409).send("duplicate key error");
        }else{
            res.status(422).send(err.message);
        }
    }
});

router.post('/signin',async(req,res)=>{
    const {email, password}  = req.body;
    if(!email || !password){
        return res.status(400).send({error:'Bad REquest'})
    }
    try{
        const user =await User.findOne({email});
        const passwordMatch = await user.comparePassword(password);
        if(user && passwordMatch){
            const token = jwt.sign({userId:user._id},secretWord);
            res.status(201).send({token});
        }else{
            res.status(422).send("----")
        }
    }catch(err){
        res.status(422).send(err.message);
    }
});

module.exports = router;