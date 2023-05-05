const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  fieldsJSON: {
    type: String,
    required: true
  },
  author: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('User', reportSchema)
