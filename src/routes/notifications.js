const {Router}=require("express")
const {authenticateUser,isActive, isAuthorized}=require('../middleware/auth.js')
const { getNotification, getNotifications, deleteNotification } = require("../controllers/notifications")

const router=Router()

router.use(authenticateUser)

router.get('/:nid',isActive,getNotification)
router.get('/',isActive,getNotifications)
router.delete('/:nid',isActive,deleteNotification)

module.exports=router

