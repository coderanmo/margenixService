let express=require('express')
const { checkTokenUsers } = require('../../middleware/checkTokenUsers')
const { addToCart, cartView, removeCart } = require('../../controllers/web/cartControllers')

let cartRoutes=express.Router()

cartRoutes.post('/add-tocart',checkTokenUsers,addToCart)
cartRoutes.post('/view-cart',checkTokenUsers,cartView)
cartRoutes.post('/remove-Cart',checkTokenUsers,removeCart)

module.exports={cartRoutes}
