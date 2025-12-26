let mongoose=require('mongoose')

let cartSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userauth'
    },
    productNameId:String,
    productName:String,

    productPrice:Number,
    productImage:String,
   
})

let cartModel=mongoose.model('cart',cartSchema)
module.exports={cartModel}