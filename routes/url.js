const express=require("express")
const { handleShortUrl } = require("../controller/url")
const URL = require("../model/url")



const router=express.Router()

router.post("/",handleShortUrl)
router.get("/:id",async(req,res)=>{
    const data=req.params.id
    const result=await URL.findOneAndUpdate({shortUrl:data},
        {$push: {visitedHistory: {timestamps: new Date().toLocaleString()}}}
    )

    
    
    
    return res.redirect(result.originalurl)
})
router.get("/all/analysis", async (req, res) => {
    const result = await URL.find({});
    console.log(result); // Log to check if data is retrieved
    return res.render("analysispage", { urls: result });
});
    

module.exports=router