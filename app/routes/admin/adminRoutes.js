let express=require('express')
const { adminAuthRoutes } = require('./adminAuthRoutes')
const { servicesRoutes } = require('./servicesRoutes')
const { helperAccount } = require('./helperAccountRoutes')
let adminRoutes=express.Router()

adminRoutes.use('/adminauth',adminAuthRoutes)
adminRoutes.use('/services',servicesRoutes)
adminRoutes.use('/helper',helperAccount)

module.exports={adminRoutes}