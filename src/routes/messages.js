const {Router}=require("express")
const router=Router()
const {createNewMessage, deleteMessage, getMessages,getMessage, replyToMessage}=require("../controllers/messages")
const { authenticateUser } = require("../middleware/auth")

router.get('/',authenticateUser,getMessages)
router.get('/:mid',authenticateUser,getMessage)
router.post('/newMessage',createNewMessage)
router.post('/reply/:mid',authenticateUser,replyToMessage)
router.delete('/deleteMessage/:mid',authenticateUser,deleteMessage)

module.exports=router