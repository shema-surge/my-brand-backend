const {Schema,Types,model}=require("mongoose")
const {randomUUID}=require("crypto")

function getRandomCode(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    let nums=''
    for(let i=1;i<=6;i++){
        nums+=Math.floor(Math.random() * (maxInt - minInt) + minInt)
    }
    return parseInt(nums)
}
  

const keySchema=new Schema({
    user:{
        type: Types.ObjectId,
        required:true
    },
    keyType:{
        type:String,
        enum:["activation","passwdReset"],
        required:true
    },
    code:{
        type:Number,
        default:()=>getRandomCode(1,9),
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