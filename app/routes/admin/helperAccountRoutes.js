let express=require('express')
const { viewHelperAccount, statusUpdateHelper, muldelHelperAccount } = require('../../controllers/admin/helperRegisterControllers')

let helperAccount=express.Router()

helperAccount.get('/view',viewHelperAccount)
helperAccount.post('/status-update',statusUpdateHelper)
helperAccount.post('/muldel-helper',muldelHelperAccount)

module.exports={helperAccount}
