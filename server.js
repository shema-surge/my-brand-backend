require("dotenv").config()
const createServer=require("./utils/app")
const mongoConnect=require("./utils/connect")

const app=createServer()

mongoConnect()

app.listen(process.env.PORT, () => {
  console.log(`Server live on port ${process.env.PORT}`);
});

module.exports=app