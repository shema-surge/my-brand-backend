const {Schema,model,Types}=require('mongoose')

const postSchema=new Schema({
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:Types.ObjectId,
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports= model('posts',postSchema)