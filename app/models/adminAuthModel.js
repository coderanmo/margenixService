let mongoose=require('mongoose')

let adminSchema=mongoose.Schema({
    adminEmail:{
        type:String,
        unique:true,
        reqquired:[true,'email is required']
    },
    adminPassword:{
       type:String,
       minlength: 6,
       required:[true,'password is required']   
    },
    adminName:String,
    adminImage:String 
}) 

let adminModel=mongoose.model('admin',adminSchema)

module.exports={adminModel}