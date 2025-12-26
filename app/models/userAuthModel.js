let mongoose=require('mongoose')
const { trim } = require('validator')

userAuthSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required'],
    },
    userEmail:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        lowercase:true,
        unique:true
    },
    userPhone:{
        type:Number,
        unique:true,
        minlength: [10, "Phone no must be at least 10 digits long"]
    },
    userPassword:{
        type:String,
        minlength:[8,'password min 8 digits'],
        required:[true,'password is required'],
        trim:true
    },
    otp:{
        type:Number
    },
    userGender:String,
    userAddress:String,
    userStatus:{
        type:Boolean,
        default:true
    }
})

userAuthModel=mongoose.model('userauth',userAuthSchema)

module.exports={userAuthModel}