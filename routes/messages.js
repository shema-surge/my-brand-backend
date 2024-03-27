const {Router}=require("express")
const router=Router()
const {createNewMessage, deleteMessage, getMessages,getMessage}=require("../controllers/messages")
const { authenticateUser } = require("../middleware/auth")

router.use(authenticateUser)

router.get('/',authenticateUser,getMessages)
router.get('/:mid',authenticateUser,getMessage)
router.post('/newMessage',createNewMessage)
router.delete('/deleteMessage/:mid',authenticateUser,deleteMessage)

module.exports=router