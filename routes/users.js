const express=require("express")
const { createUser,verify } = require("../controller/users")

const router=express.Router()

router.get('/',(req,res)=>{
    return res.render("usersigin")
})
router.get("/login",(req,res)=>{
    return res.render("userlogin")
})
router.post('/sigin',createUser)
router.post('/login',verify)
module.exports=router