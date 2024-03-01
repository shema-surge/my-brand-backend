const {Router}=require("express")
const router=Router()
const {authenticateUser}=require("../middleware/auth")
const {errHandler}=require("../middleware/errorHandler")
const {renderDashboardMessages, createNewMessage}=require("../controllers/messages")

router.get('/',authenticateUser,errHandler,renderDashboardMessages)
router.post('/newMessage',createNewMessage)

module.exports=router