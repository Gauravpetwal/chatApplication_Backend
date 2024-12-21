const express = require('express')
const router = express.Router();
const message = require('../controllers/messageContrller')
const authentication = require('../middlewares/authMiddleware')

router.post('/storeMessages',authentication, message.storeMessages)
router.get('/retriveMessages',authentication,message.retriveMessages)
router.delete('/deleteMessages/:id',authentication,message.deletemessage)
router.put('/updateMessage/:messagedId',authentication, message.updateMessage)

module.exports = router