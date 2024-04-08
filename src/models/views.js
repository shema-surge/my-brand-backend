const {Schema,model, Types}=require("mongoose")

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

module.exports=model("views",viewsSchema)