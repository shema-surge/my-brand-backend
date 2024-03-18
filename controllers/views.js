const views=require("../models/views")
const posts=require("../models/posts")


const checkViews=async(pid,uid)=>{
    try{
        const view=await views.findOne({post:pid,user:uid})
        if(view) return
        const newView=await views.create({post:pid,user:uid})
    }catch(err){
        return err
    }
}

module.exports={checkViews}