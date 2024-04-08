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
        ref:'users',
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

module.exports=model('comments',commentSchema)