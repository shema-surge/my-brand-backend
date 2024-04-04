const {Schema,model, Types}=require("mongoose")
const posts = require("./posts")

const viewsSchema=new Schema({
    post:{
        type:Types.ObjectId,
        required:true
    },
    user:{
        type:Types.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

viewsSchema.post('save',async(doc,next)=>{
    try{
        const post=await posts.findById(doc.post)
        post.views+=1
        await post.save()
    }catch(err){
        next(err)
    }
})

module.exports=model("views",viewsSchema)