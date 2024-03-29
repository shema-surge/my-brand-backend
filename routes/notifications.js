const {Router}=require("express")
const { getNotification, getNotifications, deleteNotification } = require("../controllers/notifications")


const router=Router()

router.get('/:nid',getNotification)
router.get('/',getNotifications)
router.delete('/:nid',deleteNotification)

module.exports=router

