const mongoose=require("mongoose")

const mongoConnect=()=>{
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to Mongo");
      }).catch(err=>{
        console.log(err)
    })
}

module.exports=mongoConnect