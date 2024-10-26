const express=require("express")
const mongoose = require("mongoose")
const router = require("./routes/url")
const app=express()
const path=require("path")
app.use(express.urlencoded({extended:true}))
//this line for saying that we are using ejs engine
app.set("view engine","ejs")
// batani kai liya mara views folder kidhar hai
app.set("views", path.resolve("./views"));

mongoose.connect("mongodb://localhost:27017/urldatabase")
.then(()=>{
    console.log("connection is successfull")
})
app.use("/url",router)

app.get("/",(req,res)=>{
    return res.render("home")
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
}
)





