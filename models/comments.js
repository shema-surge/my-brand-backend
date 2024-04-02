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
        post.comments+=1
        await post.save()
    }catch(err){
        next(err)
    }
})

commentSchema.post('save',async(doc,next)=>{
    try{
        const user=await users.findById(doc.author)
        const post=await posts.findById(doc.parent)
        await notifications.create({content:`user ${user.name} added a new comment on post titled: ${post.title}`})
    }catch(err){
        next(err)
    }
})


commentSchema.post('deleteOne',async(doc,next)=>{
    try{
        const post=await posts.findById(doc.parent)
        if(post.comments) post.comments-=1
        await post.save()
    }catch(err){
        next(err)
    }
})

module.exports=model('comments',commentSchema)