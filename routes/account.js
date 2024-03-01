const {Router}=require("express")
const router=Router()
const {authenticateUser}=require("../middleware/auth")
const {errHandler}=require("../middleware/errorHandler")
const { renderAccount } = require("../controllers/users")

router.get('/',authenticateUser,errHandler,renderAccount)

module.exports=router