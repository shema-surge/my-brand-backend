const {Schema,model,Types}=require('mongoose')
const posts = require('./posts')
const users = require('./users')
const notifications = require('./notifications')

const commentSchema=new Schema({
    parent:{
        type:Types.ObjectId,
        required:true
    },
    author:{
        type:Types.ObjectId,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    }
},{timestamps:true})

commentSchema.post('save',async(doc,next)=>{
    try{
        const post=await posts.findById(doc.parent)
        if(!post) throw new Error("No such post found")
        await posts.findByIdAndUpdate(doc.parent,{$inc:{comments:1}})
    }catch(err){
        next(err)
    }
})

commentSchema.post('save',async(doc,next)=>{
    try{
        const user=await users.findById(doc.author)
        const post=await posts.findById(doc.parent)
        if(!user) throw new Error("No such user found")
        if(!post) throw new Error("No such post found")
        await notifications.create({user:user._id,content:`user ${user.name} added a new comment on post titled: ${post.title}`})
    }catch(err){
        next(err)
    }
})


commentSchema.post('deleteOne',async(doc,next)=>{
    try{
        const post=await posts.findById(doc.parent)
        if(!post) throw new Error("No such post found")
        if(post.comments>0) await posts.findByIdAndUpdate(doc.parent,{$inc:{comments:-1}})
    }catch(err){
        next(err)
    }
})

module.exports=model('comments',commentSchema)