const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sourceSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Source', sourceSchema)


