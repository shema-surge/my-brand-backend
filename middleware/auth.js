const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const users=require('../models/users')

const authenticateUser=async(req,res,next)=>{
    const nonAuthPaths=["/","/blog","/login","/signup","/post"]
    try{
        const cookie=req.cookies
        if(!cookie || !cookie.token){
            throw new Error("Missing auth-cookie")
        }
        const payload=jwt.verify(cookie.token,process.env.JWT_SECRET)
        const user=await users.findOne({_id:payload.userId})
        if(!user){
            throw new Error("User does not exist")
        }
        req.user=user
        next()
    }catch(err){
        console.log(err.message)
        if(nonAuthPaths.includes(req.path)){
            next()
        }
        else{
            res.status(401).redirect("/login")
        }
    }
}

const isAuthorized=(req,res,next)=>{
    if(req.user.roles!=="admin") return res.status(401).redirect('/login')
    else next()
}

const isFrozen=(req,res,next)=>{
    if(req.user.status==="frozen") return res.status(401).redirect('/login')
    else next()
}

module.exports={authenticateUser,isAuthorized,isFrozen}