require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')
const bodyparse = require('body-parser');
 

const app = express();
app.use(bodyparse.json());
app.use(userRouter);

const mongoUri = "mongodb+srv://admin:12345@cluster0.3bp0x.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});

mongoose.connection.on('connected',()=>{
    console.log("connected")
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
})

app.get('/',(req,res)=>{
    res.send({hola:50})
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})