let mongoose=require('mongoose')

const orderSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "userauth" },
  serviceType: { type: String, required: true }, 
  helperId: { type: mongoose.Schema.Types.ObjectId, ref: "helper", default: null },

  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending"
  },

  location: String,
  createdAt: { type: Date, default: Date.now }
});

let orderModel=mongoose.model('order',orderSchema)

module.exports={orderModel}


