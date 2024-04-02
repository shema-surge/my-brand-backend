const {Schema,Types,model}=require("mongoose")

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

/*likeSchema.post('save',async(doc,next)=>{
    try{

    }catch(err){
        next(err)
    }
})*/

module.exports=model('likes',likeSchema)