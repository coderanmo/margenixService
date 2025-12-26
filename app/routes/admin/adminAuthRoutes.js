let express=require('express')
const { adminLogin } = require('../../controllers/admin/adminController')

let adminAuthRoutes=express.Router()


adminAuthRoutes.post('/login',adminLogin)


module.exports={adminAuthRoutes}