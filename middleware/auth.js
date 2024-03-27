const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const users=require('../models/users')

const authenticateUser=async(req,res,next)=>{
    try{
        const cookie=req.cookies
        if(!cookie || !cookie.token) return res.status(400).json({status:"failed",message:"Please Login Again"})
        const payload=jwt.verify(cookie.token,process.env.JWT_SECRET)
        const user=await users.findOne({_id:payload.userId})
        if(!user) return res.status(401).json({status:"failed",message:"Wrong email or password"})
        req.user=user
        next()
    }catch(err){
        //check err if expired and ask to please login again
        if(err.name==="TokenExpiredError") return res.status(401).json({status:"failed",message:"Authentication token has expired, Please login again"})
        res.status(500).json({status:"failed",message:"Internal Server Error"})
        console.log(err)
    }
}

const isAuthorized=(req,res,next)=>{
    if(req.user.role!=="admin") return res.status(401).json({status:"failed",message:"Unauthorized Action"})
    else next()
}

const isActive=(req,res,next)=>{
    if(req.user.status==="inactive") return res.status(401).json({status:"failed",message:"Inactive Account"})
    else next()
}

module.exports={authenticateUser,isAuthorized,isActive}