const {Schema,Types,model}=require("mongoose")
const notifications = require("./notifications")
const users = require("./users")
const posts = require("./posts")

const likeSchema=new Schema({
    recipient:{
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

likeSchema.post('save',async(doc,next)=>{
    const post=await posts.findById(doc.recipient)
    const user=await users.findById(doc.user)
    if(!user) throw new Error("likesError: No such user found")
    if(post){
        await notifications.create({user:post.author,content:`User ${user.name} liked your post titled ${post.title}`})
    }else{
        const comment=await posts.findById(doc.recipient)
        if(!comment) throw new Error("likesError: No such post or comment associated with this like found")
        const commentPost=await posts.findById(comment.parent)
        if(!commentPost) throw new Error("likesError: No post associated with liked comment")
        await notifications.create({user:comment.author,content:`User ${user.name} liked your comment on post titled ${commentPost.title}`})
    }
})

module.exports=model('likes',likeSchema)