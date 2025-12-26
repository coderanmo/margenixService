const { helperModel } = require("../../models/helperModel")

let viewHelperAccount=async (req,res)=>{
  let obj
  await helperModel.find()
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

let statusUpdateHelper = (req, res) => {

    let { ids } = req.body;

    if (!Array.isArray(ids)) {
        ids = [ids];
    }

    helperModel.find({ _id: { $in: ids } })
        .then((helpers) => {

            if (helpers.length === 0) {
                return res.send({
                    status: 0,
                    msg: "No helpers found"
                });
            }

            const bulkOps = helpers.map(h => {
                return {
                    updateOne: {
                        filter: { _id: h._id },
                        update: { $set: { helperStatus: !h.helperStatus } }
                    }
                };
            });

            return helperModel.bulkWrite(bulkOps);
        })
        .then((result) => {
            res.send({
                status: 1,
                msg: "Status toggled successfully",
                data: result
            });
        })
        .catch((error) => {
            res.send({
                status: 0,
                msg: "Error while updating status",
                error: error.message
            });
        });

};

let muldelHelperAccount = async (req, res) => {
    let { ids } = req.body
    let obj

    await helperModel.deleteMany({ _id: ids })
        .then((resApi) => {
            obj = {
                status: 1,
                msg: 'delete query',

            }
            res.send(obj)
        })

}


module.exports={viewHelperAccount,statusUpdateHelper,muldelHelperAccount}

