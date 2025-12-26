let express=require('express')
let multer=require('multer')
const { addServices, viewServices, singleServices, updateServices, deleteServices } = require('../../controllers/admin/addServices')
const { allWorkRequest } = require('../../controllers/web/orderControllers')
let servicesRoutes=express.Router()

let storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'upload/services')
    },
    filename:function(req,file,cb)
    {
      cb(null,Date.now()+ file.originalname)
    }
})
let upload=multer({storage:storage})

servicesRoutes.post('/create',upload.single('servicesImage'),addServices)
servicesRoutes.put('/update/:id',upload.single('servicesImage'),updateServices)
servicesRoutes.get('/view',viewServices)
servicesRoutes.get('/single-view/:id',singleServices)
servicesRoutes.delete('/delete/:id',deleteServices)
servicesRoutes.get('/all-work',allWorkRequest)

module.exports={servicesRoutes}
