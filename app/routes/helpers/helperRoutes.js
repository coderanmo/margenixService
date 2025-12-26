let express=require('express')
const { helperAuthRoutes } = require('./helperAuthRoutes')
let helperRoutes=express.Router()

helperRoutes.use('/helper-account',helperAuthRoutes)

module.exports={helperRoutes}