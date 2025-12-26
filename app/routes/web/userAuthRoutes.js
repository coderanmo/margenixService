let express=require('express')
const { createUser, loginUser, sendOtp, viewProfileUser } = require('../../controllers/web/userAuthController')
const { checkTokenUsers } = require('../../middleware/checkTokenUsers')

let userAuthRoutes=express.Router()

userAuthRoutes.post('/send-otp',sendOtp)
userAuthRoutes.post('/register',createUser)
userAuthRoutes.post('/login',loginUser)
userAuthRoutes.post('/user-data',checkTokenUsers,viewProfileUser)
module.exports={userAuthRoutes}