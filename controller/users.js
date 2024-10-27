const User = require("../model/users");

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
    return res.redirect("/")

}





module.exports={
    createUser,verify
}