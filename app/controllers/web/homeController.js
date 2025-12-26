const { servicesModel } = require("../../models/servicesModel")

let viewServicesHome = async (req, res) => {
    let obj
    await servicesModel.find({servicesStatus:true})
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

module.exports={viewServicesHome}