const express = require("express");
const path = require("node:path");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const ejs=require('ejs')

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/images", express.static("public/images"));

app.set('view engine','ejs')
app.set("views",path.join(__dirname,'public/views'))


//routes
const mainRouter=require("./routes/main")
const dashboardRouter=require("./routes/dashboard")
const messageRouter=require("./routes/messages")
const userRouter=require("./routes/users")
const accountRouter=require("./routes/account")

app.use("/",mainRouter)
app.use("/dashboard",dashboardRouter)
app.use("/messages",messageRouter)
app.use("/users",userRouter)
app.use("/account",accountRouter)


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Mongo");
}).catch(err=>{
  console.log(err)
});

app.listen(process.env.PORT, () => {
  console.log(`Server live on port ${process.env.PORT}`);
});
