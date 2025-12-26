let express=require('express')
const { viewServicesHome } = require('../../controllers/web/homeController')

let homeRoutes=express.Router()

homeRoutes.get('/home-services',viewServicesHome)

module.exports={homeRoutes}