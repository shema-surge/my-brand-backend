const notifications = require("../models/notifications")

const getNotification=async(req,res)=>{
    try{
        const {nid}=req.params
        if(!nid) return res.status(400).json({status:"sauccessfull",message:"Missing notification id"})
        const notification=await notifications.findById(nid)
        if(!notification) return res.status(404).json({status:"failed",message:"No such notification found"})
        res.status(200).json({status:"successfull",notification})
    }catch(err){
        res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const getNotifications=async(req,res)=>{
    try{
        const allUserNotifications=await notifications.find().sort({createdAt:-1})
        res.status(200).json({status:"successfull",notifications:allUserNotifications})
    }catch(err){
        res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

const deleteNotification=async(req,res)=>{
    try{
        const {nid}=req.params
        if(!nid) return res.status(400).json({status:"sauccessfull",message:"Missing notification id"})
        const deletedNotification=await notifications.findByIdAndDelete(nid)
        if(!deleteNotification) return res.status(404).json({status:"failed",message:"No such notification found"})
        res.status(200).json({status:"successfull",notification:deletedNotification})
    }catch(err){
        res.status(500).json({status:"failed",message:"Internal Server Error"})
    }
}

module.exports={getNotification,getNotifications,deleteNotification}