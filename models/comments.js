const {Schema,model,Types}=require('mongoose')

const commectSchema=new Schema({
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

module.exports=model('comments',commectSchema)