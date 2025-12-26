let express=require('express')
const { sendOtp, createHelperAccount, loginAccountHelper, helperViewAccount } = require('../../controllers/helpers/helperAuthController')
const { checkToken } = require('../../middleware/checkToken')

let helperAuthRoutes=express.Router()


helperAuthRoutes.post('/send-otp',sendOtp)
helperAuthRoutes.post('/create',createHelperAccount)
helperAuthRoutes.post('/login',loginAccountHelper)
helperAuthRoutes.post('/view',checkToken ,helperViewAccount);

module.exports={helperAuthRoutes}