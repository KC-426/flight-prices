const mongoose = require('mongoose')
const Schema = mongoose.Schema

const priceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Flight', priceSchema)