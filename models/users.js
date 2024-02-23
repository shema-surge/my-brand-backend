const {Schema,model}=require("mongoose")

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    profileImg:{
        type:String,
        default: "User-Profile-PNG-Image 1.png"
    }
},{timestamps:true})

module.exports=model('users',userSchema)