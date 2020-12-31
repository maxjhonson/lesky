const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const router = express.Router();
const secretWord = "SUPER_3.0_5.3";

router.post('/signup',async (req,res)=>{
    const {fullName, email, password, whatsapp, birthday,instagram} = req.body;
    try{
        const user = new User({fullName, email, password, whatsapp,birthday,instagram});
        const response = await user.save();
        console.log(response)
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
        return res.status(422).send({error:'Debe suministrar contraseña y correo'})
    }
    try{
        const user =await User.findOne({email});
        if(!user || user.password !== password){
            res.status(422).send("Contraseña o correo invalido")
        }else{
            const token = jwt.sign({userId:user._id},secretWord);
            res.status(201).send({token});
        }
    }catch(err){
        res.status(422).send(err.message);
    }
});

module.exports = router;