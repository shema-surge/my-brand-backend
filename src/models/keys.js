const {Schema,Types,model}=require("mongoose")
const {randomUUID}=require("crypto")

const keySchema=new Schema({
    user:{
        type: Types.ObjectId,
        requied:true
    },
    keyType:{
        type:String,
        enum:["activation","passwdReset"],
        required:true
    },
    key:{
        type:String,
        default:()=>randomUUID(),
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        expires:1800,
        default:Date.now()
    }
})

module.exports=model('keys',keySchema)