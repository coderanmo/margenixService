let express=require('express')
let mongoose=require('mongoose')
let cors=require('cors')
const { adminModel } = require('./app/models/adminAuthModel')
const { adminRoutes } = require('./app/routes/admin/adminRoutes')
const { helperRoutes } = require('./app/routes/helpers/helperRoutes')
const { webRoutes } = require('./app/routes/web/webRoutes')

let app=express()
app.use(express.json())
require('dotenv').config()
app.use(cors())

// admin
app.use('/admin',adminRoutes)

// helpers

app.use('/helper',helperRoutes)

// web
app.use('/web',webRoutes)


// image Routes
app.use('/upload/services', express.static('upload/services'))

mongoose.connect(process.env.DBNAME)
.then( async (resApi)=>{

    let checkAdmin=await adminModel.find()

    if(checkAdmin.length==0)
    {
        adminModel.insertOne({
            adminEmail:process.env.ADMINEMAIL,
            adminPassword:process.env.ADMINPASS
        })
    }

    app.listen(process.env.PORT,()=>{
        console.log('server start')
    })
})
