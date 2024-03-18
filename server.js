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
const postsRouter=require("./routes/posts")
const messageRouter=require("./routes/messages")
const userRouter=require("./routes/users")
const accountRouter=require("./routes/account");
const { authenticateUser } = require("./middleware/auth");

app.use(authenticateUser)

app.use("/",mainRouter)
app.use("/posts",postsRouter)
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
