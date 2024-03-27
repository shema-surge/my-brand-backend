const {Router}=require("express")
const { login,signup, logout} = require("../controllers/users")
const router=Router()
  
router.post("/login",login)
router.post("/signup", signup);
router.get("/logout",logout)



module.exports=router