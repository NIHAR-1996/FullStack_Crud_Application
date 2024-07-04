const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const {urlencoded}=require("body-parser");

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 8080

//Paths
app.use("/api/v1/user", require('./routes/user'));

mongoose.connect("mongodb://127.0.0.1:27017/crudoperation")
.then(()=>{
    console.log("connect to DB")
    app.listen(PORT,()=>console.log("Server is running",PORT ))
})
.catch((err)=>console.log(err));