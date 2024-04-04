const {Router}=require("express")
const {authenticateUser}=require('../middleware/auth.js')
const { getNotification, getNotifications, deleteNotification } = require("../controllers/notifications")


const router=Router()

router.get('/:nid',authenticateUser,getNotification)
router.get('/',authenticateUser,getNotifications)
router.delete('/:nid',authenticateUser,deleteNotification)

module.exports=router

