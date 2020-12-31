require('./models/User');
require('./models/Product');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')
const productRouters = require('./routes/productRoutes')
const bodyparse = require('body-parser');

 

const app = express();
app.use(bodyparse.json());
app.use(userRouter);
app.use(productRouters);

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

 

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("listening on port 3000")
})
