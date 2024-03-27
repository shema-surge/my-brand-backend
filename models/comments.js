const {Schema,model,Types}=require('mongoose')
const posts = require('./posts')

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
        const post=await posts.findById(parent)
        post.comments+=1
        await post.save()
    }catch(err){
        next(err)
    }
})

module.exports=model('comments',commentSchema)