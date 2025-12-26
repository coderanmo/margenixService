const { isLowercase } = require("validator");
const { helperModel } = require("../../models/helperModel");
const { orderModel } = require("../../models/orderModel");
let mongoose = require('mongoose')

let createOrder = async (req, res) => {
    let { serviceType, location } = req.body;

    let obj
    await orderModel.insertOne({
        clientId: req.body.id,
        serviceType,
        location
    })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'send request'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no send request'
            }
        })
    res.send(obj)

}


let viewHelperServiceSpecific = async (req, res) => {
    let { id } = req.body
    let getHelperProfile = await helperModel.findOne({ _id: id })
    let obj
    let helperProfile = getHelperProfile.helperProfile

    orderModel.find({ serviceType: { $regex: helperProfile, $options: "i" }, status: { $in: ["pending", "accepted"] } }).populate('clientId')
        .then((resApi) => {
            obj = {
                status: 1,
                data: resApi
            }
            res.send(obj)
        })
        .catch(() => {
            obj = {
                status: 0,
                msg: 'no data'
            }
            res.send(obj)
        })
}

let acceptRequest = async (req, res) => {
    let { accid, id } = req.body
    let obj
    await orderModel.findOneAndUpdate({ _id: accid, status: "pending" },
        {
            status: "accepted",
            helperId: id
        },
        { new: true }
    )
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'request accepted'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no request acceptd'
            }
        })
    res.send(obj)

}

let viewClientRequest = async (req, res) => {
    let { id } = req.body
    let obj
    await orderModel.find({ clientId: new mongoose.Types.ObjectId(id) }).populate('helperId')
        .then((resApi) => {
            obj = {
                status: 1,
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

let completeWork = async (req, res) => {
    let { accid, id, helperId } = req.body;
    let helper=helperId._id
    orderModel.findOneAndUpdate(
        {
            _id: accid,  
            clientId: new mongoose.Types.ObjectId(id),
            helperId: new mongoose.Types.ObjectId(helper),
            status: "accepted"
        },
        {
            status: "completed"
        },
        { new: true }
    )
        .then(updated => {
            if (!updated) {
                return res.status(400).send({
                    status: 0,
                    msg: "No matching request found"
                });
            }

            return res.send({
                status: 1,
                msg: "Work completed successfully",
                data: updated
            });
        })
        .catch(error => {
            return res.status(500).send({
                status: 0,
                msg: "Server error",
                error: error.message
            });
        });


}

let completeWorkHelper = async (req, res) => {

    let { id } = req.body
    let obj
    console.log("hello", id)
    await orderModel.find({ status: "completed", helperId: id }).populate('clientId')
        .then((resApi) => {

            obj = {
                status: 1,
                data: resApi
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'no request '
            }
        })
    res.send(obj)

}

let findAllWorkComplete = async (req, res) => {
    let obj
    await orderModel.find({ status: "completed" }).populate('clientId').populate('helperId')
        .then((resApi) => {
            obj = {
                status: 1,
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

let cancelRequest = async (req, res) => {
    let { accid, id } = req.body
    let obj
    await orderModel.findOneAndUpdate({ _id: accid, status: "pending" },
        {
            status: "cancelled",
            helperId: id
        },
        { new: true }
    )
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'request cancel'
            }
        })
        .catch((error) => {
            obj = {
                status: 0,
                msg: 'error'
            }
        })
    res.send(obj)

}

let deleteReuestUser = (req, res) => {
    const { accid, id } = req.body;

    if (!accid || !id) {
        return res.status(400).json({ message: "accid and id are required" });
    }

    orderModel.findOne({ _id: accid, clientId: id })
        .then((order) => {
            if (!order) {
                return res.status(404).json({ status: 0, msg: "Order not found" });
            }

            return orderModel.deleteOne({ _id: accid });
        })
        .then(() => {
            return res.status(200).json({ status: 1, msg: "Order deleted successfully" });
        })
        .catch((err) => {
            console.log("Delete Error:", err);
            return res.status(500).json({ status: 0, msg: "Internal Error", error: err });
        });
};

let allWorkRequest=async (req,res)=>{
    let obj
     await orderModel.find().populate('clientId').populate('helperId')
     .then((resApi)=>{
        obj={
            status:1,
            data:resApi
        }
     })
     .catch((error)=>{
        obj={
            status:0,
            msg:'no data'
        }
     })
     res.send(obj)

}
module.exports = {allWorkRequest, createOrder, viewHelperServiceSpecific, acceptRequest, viewClientRequest, completeWork, completeWorkHelper, findAllWorkComplete, cancelRequest, deleteReuestUser }