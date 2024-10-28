const { getUser } = require("../store/auth")


async function restrictToUser(req,res,next){

    const userUid=req.cookies.sessioniddeepak
    if(!userUid) return res.redirect("users/login")
    const user=getUser(userUid)


    if(!user) return res.redirect("users/login")
    //req.user=user
    next();


}
module.exports={restrictToUser}