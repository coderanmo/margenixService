let mongoose = require('mongoose')

let servicesSchema = new mongoose.Schema({
    
    servicesImage: {
        type: String
    },

    servicesName: {
        type: String,
        required: [true, 'services name is required'],
        unique: true
    },

    servicesPrice: {
        type: Number,
        required: [true, 'services price is required']
    },

    servicesDescription: {
        type: String
    },


    servicesStatus: {
        type: Boolean,
        default: true
    },

    servicesOrder: {
        type: Number,
        required: [true, 'services number is required'],
        unique: true
    }

})

let servicesModel = mongoose.model('services', servicesSchema)
module.exports = { servicesModel }
