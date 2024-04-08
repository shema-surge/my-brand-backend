const {Router}=require("express")
const router=Router()
const {createNewMessage, deleteMessage, getMessages,getMessage, replyToMessage}=require("../controllers/messages")
const { authenticateUser, isAuthorized, isActive } = require("../middleware/auth")

router.get('/',authenticateUser,isActive,isAuthorized,getMessages)
router.get('/:mid',authenticateUser,isActive,isAuthorized,getMessage)
router.post('/newMessage',createNewMessage)
router.post('/reply/:mid',authenticateUser,isActive,isAuthorized,replyToMessage)
router.delete('/deleteMessage/:mid',authenticateUser,isActive,isAuthorized,deleteMessage)

module.exports=router