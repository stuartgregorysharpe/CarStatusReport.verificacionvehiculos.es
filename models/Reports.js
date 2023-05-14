const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  author: {
    _id: {
      type: 'ObjectId',
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      ref: 'User',
      required: true
    }
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
})

module.exports = mongoose.model('Report', reportSchema)
