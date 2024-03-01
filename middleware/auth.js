const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const users=require('../models/users')

const authenticateUser=async(req,res,next)=>{
    try{
        const cookie=req.cookies
        if(!cookie || !cookie.token) throw new Error("Access forbidden")
        const payload=jwt.verify(cookie.token,process.env.JWT_SECRET)
        const user=await users.findOne({_id:payload.userId})
        if(!user) throw new Error("Access forbidden")
        req.user=user
        req.loggedIn=true
        next()
    }catch(err){
        req.loggedIn=false
        next(err)
    }
}

module.exports={authenticateUser}