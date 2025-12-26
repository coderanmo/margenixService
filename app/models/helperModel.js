let mongoose=require('mongoose')

let helperSchema=mongoose.Schema({
    helperName:{
        type:String,
        required:[true,'name is required']
    },
    helperEmail:{
        type:String,
        require:[true,'email is required'],
        unique:true
    },
    helperProfile:{
        type:String,
        required:[true,'helper profile is required']
    },
    helperPhone:{
        type:String,
        required:[true,'phone is required']
    },
    helperPassword:{
      type:String,
      require:[true,'password is required']
    },
    helperStatus:{
        type:Boolean,
        default:false
    },
    otp:{
      type:Number,
      require:[true,'OTP is required']
    },
    
})

let helperModel=mongoose.model('helper',helperSchema)
module.exports={helperModel}