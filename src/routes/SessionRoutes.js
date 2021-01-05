const express = require('express');
const mongoose = require('mongoose');
const Session = mongoose.model('Session');
const router = express.Router();

router.get('/sessions', async(req,res)=>{
        const sessions  = await Session.find(req.query);
        res.status(200).send(sessions);
});

router.get('/sessions/:id', async(req,res)=>{
    const session  = await Session.find({_id: req.params.id}).populate({path:'accessories',populate:{path:'items'}});
    res.status(200).send(session);
});

router.post('/sessions',async(req, res)=>{
    try{
        const session = new Session(req.body);
        const response = await session.save();
        res.status(201).send(response)
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;


 