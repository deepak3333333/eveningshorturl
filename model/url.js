const { default: mongoose } = require("mongoose");

const urlSchema = new mongoose.Schema({
            originalurl:{
        type:String,
        
    },
         shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    visitedHistory:[{timestamps:{type:String}}]

},{timestamps:true})

const URL= mongoose.model("urltable",urlSchema)

module.exports=URL