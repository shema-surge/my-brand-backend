const {Router}=require("express")
const router=Router()
const {renderMessages, createNewMessage, deleteMessage, getMessages}=require("../controllers/messages")
const { authenticateUser } = require("../middleware/auth")

router.use(authenticateUser)

router.get('/',renderMessages)
router.get('/getMessages',getMessages)
router.post('/newMessage',createNewMessage)
router.delete('/deleteMessage',deleteMessage)

module.exports=router