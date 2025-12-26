let express=require('express')
const { homeRoutes } = require('./homeRoutes')
const { userAuthRoutes } = require('./userAuthRoutes')
const { cartRoutes } = require('./cartRoutes')
const { orderRoutes } = require('./orderRoutes')

let webRoutes=express.Router()

webRoutes.use('/home',homeRoutes)
webRoutes.use('/userauth',userAuthRoutes)
webRoutes.use('/cart',cartRoutes)
webRoutes.use('/order',orderRoutes)

module.exports={webRoutes}