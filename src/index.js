require('./models/User');
require('./models/Session');
require('./models/AccessoryItem');
require('./models/Accessory');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes')
const SessionRoutes = require('./routes/SessionRoutes')
const AccessoryItemRoutes= require('./routes/AccessoryItemRoutes')
const AccessoryRoutes= require('./routes/AccessoryRoutes')
const bodyparse = require('body-parser');

const app = express();
app.use(bodyparse.json());
app.use(userRouter);
app.use(SessionRoutes);
app.use(AccessoryItemRoutes);
app.use(AccessoryRoutes);

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
