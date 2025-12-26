const { servicesModel } = require("../../models/servicesModel")

let addServices = async (req, res) => {
    let insertObj = { ...req.body }

    let obj
    if (req.file) {
        if (req.file.filename) {
            insertObj['servicesImage'] = req.file.filename
        }
    }
    console.log(insertObj)
    await servicesModel.insertOne(insertObj)
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data insert',
            }
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 110000) {
                errorMsg: 'duplicate order number inserted'
            }
            if (error.errors) {

                if (error.errors.servicesName) {
                    errorMsg = error.errors.servicesName.message
                }
                if (error.errors.servicesPrice) {
                    errorMsg = error.errors.servicesPrice.message
                }
                if (error.errors.servicesOrder) {
                    errorMsg = error.errors.sliderOrder.message
                }
            }
            obj = {
                status: 0,
                msg: errorMsg
            }
        })
    res.send(obj)
}

let viewServices = async (req, res) => {
    let obj
    await servicesModel.find()
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHSERVICES,
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

let deleteServices = async (req, res) => {
  let {id}=req.params
  let obj
  
    await servicesModel.deleteOne({_id:id})
        .then((resApi) => {
            obj = {
                status: 1,
                msg:'delete query'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no delete'
            }
        })
    res.send(obj)
}
let singleServices = async (req, res) => {
    let { id } = req.params
    let obj
    await servicesModel.find({ _id: id })
        .then((resApi) => {
            obj = {
                status: 1,
                staticPath: process.env.STATICPATHSERVICES,
                data: resApi[0]
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

let updateServices = async (req, res) => {
    let { id } = req.params
    let updateObj={...req.body}
    
    if (req.file) {
        if (req.file.filename) {
            updateObj['servicesImage'] = req.file.filename
        }
    }
    await servicesModel.updateOne({ _id: id }, { $set: updateObj })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'data update',
            }
        })
        .catch((error) => {
            let errorMsg
            if (error.code == 110000) {
                errorMsg: 'duplicate order number inserted'
            }
            if (error.errors) {

                if (error.errors.servicesName) {
                    errorMsg = error.errors.servicesName.message
                }
                if (error.errors.servicesPrice) {
                    errorMsg = error.errors.servicesPrice.message
                }
                if (error.errors.servicesOrder) {
                    errorMsg = error.errors.sliderOrder.message
                }
            }
            obj = {
                status: 0,
                msg: errorMsg
            }
        })
    res.send(obj)

}
module.exports = { addServices, viewServices, singleServices,updateServices,deleteServices }