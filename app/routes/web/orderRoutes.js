let express=require('express')
const { createOrder, viewHelperServiceSpecific, acceptRequest, viewClientRequest, completeWork, completeWorkHelper, findAllWorkComplete, cancelRequest, deleteReuestUser } = require('../../controllers/web/orderControllers')
const { checkTokenUsers } = require('../../middleware/checkTokenUsers')
const { checkToken } = require('../../middleware/checkToken')

let orderRoutes=express.Router()

orderRoutes.post('/create',checkTokenUsers,createOrder)
orderRoutes.post('/helper-requests',checkToken,viewHelperServiceSpecific)
orderRoutes.post('/accept-request',checkToken,acceptRequest)
orderRoutes.post('/view-client',checkTokenUsers,viewClientRequest)
orderRoutes.post('/complete-work',checkTokenUsers,completeWork)
orderRoutes.post('/complete-work-helper',checkToken,completeWorkHelper)
orderRoutes.get('/admin-work-completed',findAllWorkComplete)
orderRoutes.post('/cancel-request',checkToken,cancelRequest)
orderRoutes.post('/cancel-request-user',checkTokenUsers,deleteReuestUser)

module.exports={orderRoutes}
