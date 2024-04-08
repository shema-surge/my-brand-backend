const keys=require("../models/keys")
const users = require("../models/users")

const isValidPasswdResetKey=async(req,res)=>{
    try{
        const {code}=req.params
        const {email}=req.body
        
        if(!code) return res.status(400).status({status:"failed",message:"Missing code parameter"})
        if(!email) return res.status(400).status({status:"failed",message:"Missing email data field"})

        const user=await users.findOne({email:email})
        if(!user) return res.status(404).json({status:"failed",message:"No user associated with this email"})

        const key=await keys.findOne({user:user._id,code:code})
        if(!key) return res.status(404).json({status:"failed",message:"No such key found/Invalid key"})

        res.status(200).json({status:"successfull",message:"Valid Key"})

    }catch(err){
        res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

module.exports={isValidPasswdResetKey}