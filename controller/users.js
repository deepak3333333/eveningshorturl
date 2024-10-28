const User = require("../model/users");
//import of uuid of v4
const {v4:uuidv4}=require("uuid");
const { setUser } = require("../store/auth");


async function createUser(req, res) {
    const {name,email,password}=req.body
    const crea=await User.create({name,email,password})
    if(!crea){
        return res.status(404).json({message:"user not created"})
    }

    return res.redirect("/")

    
}
async function verify(req,res){

    const {email,password}=req.body
    const verify1=await User.findOne({email,password})
    if(!verify1){
        return res.status(404).json({message:"user not found"})
    }
    const sesssionid=uuidv4()
    console.log(sesssionid);
    
    setUser(sesssionid,verify1)
    res.cookie("sessioniddeepak",sesssionid)
   
    
    return res.redirect("/")

}





module.exports={
    createUser,verify
}