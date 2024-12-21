const express = require('express')
const router = express.Router();
const user = require('../controllers/userController')
const authentication = require('../middlewares/authMiddleware');



router.post ('/verifyuser', authentication, (req,res)=>{return res.status(201).json({id:req.user.id})})
router.post('/singup', user.singnup);
router.post('/signin', user.signIn);
router.get('/alluser', authentication, user.allUser);
router.post('/forgetPassword', user.forgetPassword);
router.post('/restPassword', user.resetPassword);


module.exports = router

