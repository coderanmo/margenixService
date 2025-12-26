const { cartModel } = require("../../models/cartModel")

let addToCart = async (req, res) => {
    let { id, prudctId, Image, productName,  price } = req.body
    let obj
    let insertObj = {
        user: id,
        productNameId: prudctId,
        productName: productName,
       
        productPrice: price,
        productImage: Image
    }
    await cartModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'add cart'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no add'
            }
        })
    res.send(obj)
}

let cartView = async (req, res) => {
    let {id} = req.body
    console.log(id)
    await cartModel.find({ user: id })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHPRODUCT,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no data'
            }
        })
    res.send(obj)
}
let removeCart = async (req, res) => {
    let { cid } = req.body;
    let obj;

    await cartModel.deleteOne({ _id: cid })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'remove product'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'please select one product'
            }
        })
    res.send(obj)
};

module.exports={addToCart,cartView,removeCart}