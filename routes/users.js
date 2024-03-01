const {Router}=require("express")
const router=Router()
const {authenticateUser}=require("../middleware/auth")
const {errHandler}=require("../middleware/errorHandler")
const { renderUsers } = require("../controllers/users")

router.get('/',authenticateUser,errHandler,renderUsers)

module.exports=router